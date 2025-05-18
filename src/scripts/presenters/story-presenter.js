import Swal from 'sweetalert2';
import * as AuthApi from '../api/story.js';
import StoryView from '../views/StoryView.js';
import IDBHelper from '../database/idb.js';

class StoryPresenter {
  constructor({ view }) {
    this.view = view;
    this.token = localStorage.getItem('token');
    this.stories = [];
    this.savedIds = [];
    this.init();
  }

  async init() {
    try {
      if (!this.token) {
        Swal.fire('Login Required', 'Please login first.', 'warning');
        window.location.hash = '#/login';
        return;
      }

      const stories = await AuthApi.getStories(this.token);
      this.stories = stories;

      const savedStories = await IDBHelper.getAllStories();
      this.savedIds = savedStories.map((s) => String(s.id));

      this.view.render();
      await this.refreshStories();
    } catch (error) {
      const offlineStories = await IDBHelper.getAllStories();
      this.stories = offlineStories;
      this.savedIds = offlineStories.map((s) => String(s.id));

      this.view.render();
      if (offlineStories.length > 0) {
        await this.refreshStories();
        Swal.fire('Offline Mode', 'Showing data from local storage.', 'info');
      } else {
        Swal.fire('Failed to Load Stories', 'No data available.', 'error');
      }
    }

    this.view.onClearStorageClick(this.handleClearStorage.bind(this));
  }

  async refreshStories() {
    const savedStories = await IDBHelper.getAllStories();
    this.savedIds = savedStories.map((s) => String(s.id));
    const savedIdSet = new Set(this.savedIds);

    const onlySavedStories = this.stories.filter((s) => savedIdSet.has(String(s.id)));
    const unsavedStories = this.stories.filter((s) => !savedIdSet.has(String(s.id)));

    const mergedStories = [...unsavedStories, ...onlySavedStories];

    await this.view.showStories(mergedStories, this.savedIds);

    this.view.onDetailClick(this.handleDetailClick.bind(this));
    this.view.onDownloadClick();
    this.view.onSaveClick(this.handleSaveStory.bind(this));
    this.view.onDeleteClick(this.handleDeleteStory.bind(this));
  }

  handleDetailClick(id) {
    window.location.hash = `#/stories/${id}`;
  }

  async handleSaveStory(id) {
    try {
      const story = this.stories.find((s) => String(s.id) === String(id));
      if (!story) {
        Swal.fire('Failed', 'Story not found.', 'error');
        return;
      }

      await IDBHelper.saveStory(story);
      await this.refreshStories();

      Swal.fire('Success', 'Story saved to local storage.', 'success');
    } catch (error) {
      console.error('Failed to save story:', error);
      Swal.fire('Error', 'Failed to save story.', 'error');
    }
  }

  async handleDeleteStory(id) {
    try {
      const stringId = String(id);
      console.log('Deleting story with ID:', stringId);

      await IDBHelper.deleteStory(stringId);

      this.savedIds = this.savedIds.filter((savedId) => savedId !== stringId);
      await this.refreshStories();

      Swal.fire('Deleted', 'Story removed from local storage.', 'success');
    } catch (error) {
      console.error('Failed to delete story:', error);
      Swal.fire('Error', 'Failed to delete story.', 'error');
    }
  }

  async handleClearStorage() {
    try {
      await IDBHelper.clearStories();
      this.savedIds = [];
      await this.refreshStories();

      Swal.fire('Success', 'All local stories have been cleared.', 'success');
    } catch (error) {
      console.error('Failed to clear all stories:', error);
      Swal.fire('Error', 'Failed to clear local stories.', 'error');
    }
  }
}

export default StoryPresenter;
