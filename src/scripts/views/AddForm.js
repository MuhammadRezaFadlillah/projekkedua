import Swal from 'sweetalert2';

const AddForm = {
  presenter: null,

  render() {
    return `
      <section class="add-story" aria-labelledby="form-title">
        <h2 id="form-title">Add New Story</h2>
        <form id="add-story-form" enctype="multipart/form-data" aria-describedby="form-description">
          <p id="form-description" style="display:none;">Use this form to submit a new story with image and location.</p>

          <div class="form-group">
            <label for="description">Description <span aria-hidden="true">*</span></label>
            <textarea id="description" name="description" required placeholder="Tell your story..." aria-label="Story description"></textarea>
          </div>

          <div class="form-group">
            <label for="upload-file">Upload Image from Gallery</label>
            <input type="file" id="upload-file" name="upload-file" accept="image/*" aria-describedby="upload-help" />
            <small id="upload-help">Choose an image from your device.</small>
            <img id="image-preview" style="display:none; margin-top:10px; max-width:100%; border-radius:10px;" alt="Image preview of your story" />
          </div>

          <div class="form-group">
            <label for="camera-stream">Capture Image from Camera</label>
            <video id="camera-stream" autoplay playsinline class="responsive-media" aria-label="Live camera preview"></video>
            <button type="button" id="capture-btn" class="capture-button" style="margin-top:10px;" aria-label="Capture image from camera">📸 Capture</button>
            <canvas id="snapshot" class="responsive-media" style="display:none;" aria-hidden="true"></canvas>
          </div>

          <div class="form-group">
            <label for="map-picker">Choose Location</label>
            <div id="map-picker" style="height: 300px; border-radius: 10px; overflow: hidden;" role="region" aria-label="Map location picker" tabindex="0"></div>
            <p id="location-coordinates" style="text-align:center; font-size: 0.9rem; color: #555;">Coordinates will appear here after picking a location.</p>
          </div>

          <button type="submit" class="submit-button" aria-label="Submit your story with image and location">🚀 Submit Story</button>
        </form>
      </section>
    `;
  },

  bindPresenter(presenter) {
    this.presenter = presenter;

    window.addEventListener('hashchange', () => presenter.handleRouteChange());

    const form = document.getElementById('add-story-form');
    const descriptionInput = document.getElementById('description');
    const video = document.getElementById('camera-stream');
    const canvas = document.getElementById('snapshot');
    const preview = document.getElementById('image-preview');
    const uploadInput = document.getElementById('upload-file');
    const captureBtn = document.getElementById('capture-btn');
    const mapContainer = 'map-picker';
    const coordLabel = document.getElementById('location-coordinates');

    presenter.startCamera(video);
    presenter.initMap(mapContainer, coordLabel);

    form.addEventListener('submit', (e) => presenter.handleSubmit(e, descriptionInput));
    captureBtn.addEventListener('click', () => presenter.captureImage(video, canvas, preview));
    uploadInput.addEventListener('change', (e) =>
      presenter.handleFileUpload(e.target.files[0], preview, canvas)
    );
  }
};

export default AddForm;
