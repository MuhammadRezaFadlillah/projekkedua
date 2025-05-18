// src/views/DetailView.js
import L from 'leaflet';
import detailViewTemplate from './templates/detailViewTemplate'; // Dibiarkan ada, tapi tidak digunakan lagi

const DetailView = {
  _map: null,

  render() {
    return `
      <section id="detail" class="detail-page" style="display: flex; flex-direction: column; align-items: center; margin-top: 2rem;">
        <div class="detail-container" style="max-width: 500px; width: 100%; background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;" aria-label="Detail cerita">
          <div class="detail-image-container">
            <img id="detail-image" alt="Foto cerita" class="detail-image" style="width: 100%; height: auto;" />
            <div style="text-align: right; padding: 0.5rem;">
              <button id="download-button" aria-label="Unduh gambar cerita" style="background: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">
                📥 Unduh Gambar
              </button>
            </div>
          </div>
          <div class="detail-info" style="padding: 1rem;">
            <h2 id="detail-name" style="margin-bottom: 0.5rem;" aria-label="Nama pengguna"></h2>
            <p id="detail-description" style="margin-bottom: 1rem;" aria-label="Deskripsi cerita"></p>
            <p style="font-size: 0.9rem; color: #555;" aria-label="Tanggal dibuat">
              <strong>Dibuat pada:</strong> <span id="detail-createdAt"></span>
            </p>
            <p style="font-size: 0.9rem; color: #555;" aria-label="Lokasi cerita">
              <strong>Lokasi:</strong> <span id="detail-location"></span>
            </p>
          </div>
        </div>
        <div id="map" style="width: 100%; height: 400px; margin-top: 2rem; max-width: 500px;" aria-label="Peta lokasi cerita"></div>
      </section>
    `;
  },

  showDetail(story) {
    const img = document.getElementById('detail-image');
    img.src = story.photoUrl || 'default.jpg';
    img.alt = `Foto cerita dari ${story.name || 'Pengguna'}`;

    document.getElementById('detail-name').textContent = story.name || 'Tidak ada nama';
    document.getElementById('detail-description').textContent = story.description || 'Tidak ada deskripsi';
    document.getElementById('detail-createdAt').textContent = new Date(story.createdAt).toLocaleString('id-ID');

    if (story.lat !== undefined && story.lon !== undefined) {
      document.getElementById('detail-location').textContent = `${story.lat}, ${story.lon}`;
      this.showMap(story.lat, story.lon);
    } else {
      document.getElementById('detail-location').textContent = 'Tidak diketahui';
    }

    this.setupDownloadButton(story.photoUrl);
  },

  setupDownloadButton(photoUrl) {
    const downloadBtn = document.getElementById('download-button');
    if (downloadBtn && photoUrl) {
      downloadBtn.addEventListener('click', async () => {
        try {
          const response = await fetch(photoUrl);
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const fileName = photoUrl.split('/').pop().split('?')[0] || 'gambar.jpg';

          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Gagal mengunduh gambar:', error);
          alert('Gagal mengunduh gambar.');
        }
      });
    }
  },

  showMap(lat, lon) {
    if (this._map) {
      this._map.remove();
      this._map = null;
    }

    this._map = L.map('map').setView([lat, lon], 13);

    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });

    const satellite = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=2sxrVeV47fFEDxOxOeGS', {
      attribution: '&copy; MapTiler & OpenStreetMap contributors'
    });

    const dark = L.tileLayer('https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=2sxrVeV47fFEDxOxOeGS', {
      attribution: '&copy; MapTiler & OpenStreetMap contributors'
    });

    streets.addTo(this._map);

    L.marker([lat, lon]).addTo(this._map)
      .bindPopup('Lokasi cerita')
      .openPopup();

    L.control.layers({
      "Streets": streets,
      "Satellite": satellite,
      "Dark Mode": dark
    }).addTo(this._map);
  }
};

export default DetailView;
