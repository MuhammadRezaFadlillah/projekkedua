// src/views/StoryView.js
import L from 'leaflet';

const StoryView = {
  _map: null,

  render() {
    return `
      <section id="main-content" tabindex="-1" class="story-feed" style="padding: 1rem;">
        <h2 tabindex="0" style="margin-bottom: 1rem;">Daftar Cerita</h2>

        <h3>Belum Disimpan</h3>
        <div id="unsaved-story-list" class="story-list" role="list" aria-label="Cerita belum disimpan"></div>

        <h3 style="margin-top: 2rem;">Cerita Tersimpan</h3>
        <div id="saved-story-list" class="story-list" role="list" aria-label="Cerita tersimpan"></div>

        <button id="clear-storage" style="margin-top: 2rem;" aria-label="Hapus cerita yang tersimpan lokal">
          🗑️ Hapus Semua Cerita Lokal
        </button>

        <div id="map" style="height: 400px; margin-top: 20px;" aria-label="Peta lokasi cerita"></div>
      </section>
    `;
  },

  async showStories(stories, savedIds = []) {
    const savedList = document.getElementById('saved-story-list');
    const unsavedList = document.getElementById('unsaved-story-list');

    savedList.innerHTML = '';
    unsavedList.innerHTML = '';

    try {
      const mapContainer = document.getElementById('map');
      if (this._map) {
        this._map.remove();
        this._map = null;
      }

      if (mapContainer) {
        this._map = L.map(mapContainer).setView([-6.2, 106.816666], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(this._map);
      }

      const latLngs = [];

      stories.forEach((story) => {
        const storyItem = document.createElement('article');
        storyItem.classList.add('story-item', 'fade-in');
        storyItem.setAttribute('role', 'listitem');
        storyItem.setAttribute('tabindex', '0');

        const isSaved = savedIds.includes(String(story.id));

        storyItem.innerHTML = `
          <header style="display: flex; align-items: center; gap: 8px;">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(story.name)}" alt="Avatar ${story.name}" width="40" height="40" style="border-radius: 50%;" />
            <span style="font-weight: bold;">${story.name}</span>
          </header>

          <div style="margin-top: 8px;">
            <img src="${story.photoUrl}" alt="Foto cerita oleh ${story.name}" style="width: 100%; border-radius: 8px;" loading="lazy" />
          </div>

          <p style="margin-top: 8px;">${story.description || 'Tidak ada deskripsi.'}</p>

          <p style="font-size: 0.9rem; color: #555;">
            <strong>Tanggal:</strong> ${
              story.createdAt
                ? new Date(story.createdAt).toLocaleString('id-ID')
                : 'Tidak tersedia'
            }
          </p>

          <p style="font-size: 0.9rem; color: #555;">
            <strong>Koordinat:</strong> ${
              typeof story.lat === 'number' && typeof story.lon === 'number'
                ? `${story.lat.toFixed(5)}, ${story.lon.toFixed(5)}`
                : 'Tidak tersedia'
            }
          </p>

          <div class="button-group" style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px;">
            <button class="detail-button" data-id="${story.id}">🔍 Lihat Detail</button>
            <button class="download-button" data-url="${story.photoUrl}">📥 Download</button>
            <button class="save-button ${isSaved ? 'saved' : ''}" data-id="${story.id}">
              💾 ${isSaved ? 'Tersimpan' : 'Simpan'}
            </button>
            <button class="delete-button" data-id="${story.id}">🗑️ Hapus</button>
          </div>
        `;

        if (isSaved) {
          savedList.appendChild(storyItem);
        } else {
          unsavedList.appendChild(storyItem);
        }

        if (this._map && typeof story.lat === 'number' && typeof story.lon === 'number') {
          const marker = L.marker([story.lat, story.lon]).addTo(this._map);
          marker.bindPopup(`<strong>${story.name}</strong><br/>${story.description || ''}`).openPopup();
          setTimeout(() => marker.closePopup(), 1500);
          latLngs.push([story.lat, story.lon]);
        }
      });

      if (this._map && latLngs.length > 0) {
        this._map.fitBounds(L.latLngBounds(latLngs));
      }
    } catch (error) {
      console.error('Gagal memuat peta:', error);
    }
  },

  bindEvents() {
    this.onDetailClick(this._detailCallback);
    this.onDownloadClick();
    this.onSaveClick(this._saveCallback);
    this.onDeleteClick(this._deleteCallback);
    this.onClearStorageClick(this._clearStorageCallback);
  },

  onDetailClick(callback) {
    this._detailCallback = callback;
    document.querySelectorAll('.detail-button').forEach((btn) => {
      btn.addEventListener('click', () => callback(btn.dataset.id));
    });
  },

  onDownloadClick() {
    document.querySelectorAll('.download-button').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const imageUrl = btn.dataset.url;
        const fileName = imageUrl.split('/').pop().split('?')[0] || 'gambar.jpg';
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    });
  },

  onSaveClick(callback) {
    this._saveCallback = callback;
    document.querySelectorAll('.save-button').forEach((btn) => {
      btn.addEventListener('click', () => callback(btn.dataset.id));
    });
  },

  onDeleteClick(callback) {
    this._deleteCallback = callback;
    document.querySelectorAll('.delete-button').forEach((btn) => {
      btn.addEventListener('click', () => callback(btn.dataset.id));
    });
  },

  onClearStorageClick(callback) {
    this._clearStorageCallback = callback;
    const btn = document.getElementById('clear-storage');
    if (btn) btn.addEventListener('click', () => callback());
  },

  setSavedStatus(id, saved) {
    const btn = document.querySelector(`.save-button[data-id="${id}"]`);
    if (btn) {
      btn.classList.toggle('saved', saved);
      btn.textContent = saved ? '💾 Tersimpan' : '💾 Simpan Cerita';
    }
  },
};

export default StoryView;
