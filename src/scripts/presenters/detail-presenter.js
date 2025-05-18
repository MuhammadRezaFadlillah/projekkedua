import Swal from 'sweetalert2';
import * as AuthApi from '../api/story.js';
import DetailView from '../views/DetailView.js';

class DetailPresenter {
  constructor({ view }) {
    this.view = view;
    this.token = localStorage.getItem('token');
    this.init();
  }

  async init() {
    try {
      if (!this.token) {
        Swal.fire({
          icon: 'warning',
          title: 'Login Required',
          text: 'Please login first.',
        });
        window.location.hash = '#/login';
        return;
      }

      const urlParts = window.location.hash.split('/');
      const id = urlParts[urlParts.length - 1];

      const story = await AuthApi.getDetailStory(this.token, id);
      this.view.showDetail(story);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load story detail.',
      });
    }
  }
}

export default DetailPresenter;
