const addFormTemplate = `
  <section class="add-story">
    <h2>Add New Story</h2>
    <form id="add-story-form" enctype="multipart/form-data">
      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" required placeholder="Tell your story..."></textarea>
      </div>

      <!-- Upload from Gallery -->
      <div class="form-group">
        <label for="upload-file">Upload from Gallery</label>
        <div class="file-input">
          <input type="file" id="upload-file" accept="image/*" />
          <span class="file-input-icon">📷</span>
        </div>
        <img id="image-preview" style="display:none; margin-top:10px; max-width:100%; border-radius:10px;" alt="Image Preview" />
      </div>

      <!-- Capture from Camera -->
      <div class="form-group">
        <label>Capture Image from Camera</label>
        <video id="camera-stream" autoplay playsinline class="responsive-media"></video>
        <button type="button" id="capture-btn" class="capture-button" style="margin-top:10px;">📸 Capture</button>
        <canvas id="snapshot" class="responsive-media" style="display:none;"></canvas>
      </div>

      <!-- Map Picker -->
      <div class="form-group">
        <label>Choose Location</label>
        <div id="map-picker" style="height: 300px; border-radius: 10px; overflow: hidden;"></div>
        <p id="location-coordinates" style="text-align:center; font-size: 0.9rem; color: #555;"></p>
      </div>

      <!-- Form Validation Status -->
      <div id="form-status" class="form-status"></div>

      <!-- Submit and Reset Buttons -->
      <div class="form-buttons">
        <button type="submit" class="submit-button">🚀 Submit Story</button>
        <button type="reset" class="reset-button">↻ Reset Form</button>
      </div>
      
      <!-- Loading Indicator -->
      <div id="loading-indicator" class="loading-indicator" style="display: none;">⏳ Submitting...</div>
    </form>
  </section>
`;

export default addFormTemplate;
