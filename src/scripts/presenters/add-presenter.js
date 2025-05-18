import Swal from 'sweetalert2';
import * as AuthApi from '../api/story.js';
import AddForm from '../views/AddForm.js';

class AddPresenter {
  constructor({ view }) {
    this.view = view;
    this.token = localStorage.getItem('token');
    this.stream = null;
    this.capturedImage = null;
    this.uploadedImage = null;
    this.lat = null;
    this.lon = null;

    this.handleRouteChange = this.handleRouteChange.bind(this);

    if (this.view) {
      this.view.bindPresenter(this);
    }
  }

  async startCamera(videoElement) {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoElement) {
        videoElement.srcObject = this.stream;
      }
    } catch (error) {
      console.error('Camera error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Camera Error',
        text: 'Unable to access camera.',
      });
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  handleRouteChange() {
    this.stopCamera();
  }

  captureImage(videoElement, canvasElement, previewElement) {
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    const context = canvasElement.getContext('2d');
    context.drawImage(videoElement, 0, 0);
    canvasElement.style.display = 'block';
    previewElement.style.display = 'none';

    canvasElement.toBlob((blob) => {
      this.capturedImage = blob;
      this.uploadedImage = null;
    }, 'image/jpeg');

    this.stopCamera();
  }

  handleFileUpload(file, previewElement, canvasElement) {
    if (file) {
      this.uploadedImage = file;
      this.capturedImage = null;

      const reader = new FileReader();
      reader.onload = (e) => {
        previewElement.src = e.target.result;
        previewElement.style.display = 'block';
      };
      reader.readAsDataURL(file);

      canvasElement.style.display = 'none';
      this.stopCamera();
    }
  }

  initMap(mapContainer, coordinateLabel) {
    const map = L.map(mapContainer).setView([-6.200000, 106.816666], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    let marker;
    map.on('click', (e) => {
      this.lat = e.latlng.lat;
      this.lon = e.latlng.lng;

      coordinateLabel.textContent = `Lat: ${this.lat.toFixed(5)}, Lng: ${this.lon.toFixed(5)}`;

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }
    });
  }

  async handleSubmit(e, descriptionInput, resetForm, snapshotElement, previewElement, coordinateLabel) {
    e.preventDefault();
    const description = descriptionInput.value.trim();
    const imageToUpload = this.uploadedImage || this.capturedImage;

    if (!description) {
      Swal.fire({
        icon: 'warning',
        title: 'Description Required',
        text: 'Description is required.',
      });
      return;
    }

    if (!imageToUpload) {
      Swal.fire({
        icon: 'warning',
        title: 'Image Required',
        text: 'Please capture or upload an image first.',
      });
      return;
    }

    try {
      await AuthApi.addNewStory(this.token, {
        description,
        photo: imageToUpload,
        lat: this.lat,
        lon: this.lon,
      });

      this.stopCamera();

      Swal.fire({
        title: 'Story Added',
        text: 'Story added successfully!',
        icon: 'success',
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
      });

      // Pemberitahuan push jika service worker aktif
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification('Story berhasil dibuat', {
          body: `Anda telah membuat story baru dengan deskripsi: ${description}`,
          icon: '/icons/icon-192x192.png',
          vibrate: [100, 50, 100],
        });
      }

      // Reset
      if (resetForm) resetForm();
      if (snapshotElement) snapshotElement.style.display = 'none';
      if (previewElement) previewElement.style.display = 'none';
      if (coordinateLabel) coordinateLabel.textContent = '';
      this.lat = null;
      this.lon = null;

    } catch (error) {
      console.error('Error uploading story:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Failed to add story: ${error.message}`,
      });
    }
  }
}

export default AddPresenter;
