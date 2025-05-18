const DB_NAME = 'story-db';
const DB_VERSION = 1;
const STORE_NAME = 'stories';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function waitForTransaction(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

const IDBHelper = {
  async saveStory(story) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const storyToSave = { ...story, id: String(story.id) }; // pastikan ID string
    store.put(storyToSave);

    return waitForTransaction(tx);
  },

  async getAllStories() {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async deleteStory(id) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const stringId = String(id); // pastikan ID bertipe string
    const request = store.delete(stringId);
    request.onsuccess = () => console.log(`Cerita dengan ID ${stringId} berhasil dihapus.`);
    request.onerror = () => console.error(`Gagal menghapus cerita dengan ID ${stringId}`);

    return waitForTransaction(tx);
  },

  async clearStories() {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
    return waitForTransaction(tx);
  },
};

export default IDBHelper;

