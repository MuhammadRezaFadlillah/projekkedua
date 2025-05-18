const detailViewTemplate = `
  <section id="detail" class="detail-page" style="display: flex; flex-direction: column; align-items: center; margin-top: 2rem; padding: 0 1rem 5rem;">
    <div class="detail-container" style="max-width: 500px; width: 100%; background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden; margin-bottom: 2rem;">
      
      <!-- Image with Hover Zoom Effect -->
      <div class="detail-image-container" style="position: relative;">
        <img id="detail-image" alt="Story Image" class="detail-image" style="width: 100%; height: auto; transition: transform 0.3s ease; object-fit: cover; border-radius: 10px;">
        <div class="hover-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.2); display: none;"></div>
      </div>
      
      <!-- Detail Information -->
      <div class="detail-info" style="padding: 1rem;">
        <h2 id="detail-name" style="margin-bottom: 0.5rem; font-size: 1.5rem; font-weight: bold;"></h2>
        <p id="detail-description" style="margin-bottom: 1rem; font-size: 1rem; color: #333; line-height: 1.5;"></p>
        <p style="font-size: 0.9rem; color: #555;">
          <strong>Created at:</strong> <span id="detail-createdAt"></span>
        </p>
        <p style="font-size: 0.9rem; color: #555;">
          <strong>Location:</strong> <span id="detail-location"></span>
        </p>
      </div>
    </div>

    <!-- Map -->
    <div id="map" style="width: 100%; height: 400px; margin-top: 2rem; max-width: 500px;"></div>
    
    <!-- Back to Stories Link -->
    <a href="#/stories" class="navbar-button" style="margin-top: 2rem; padding: 10px 20px; font-size: 1rem; background-color: #007bff; color: white; border: none; border-radius: 5px; text-align: center; text-decoration: none;">
       Back to Stories
    </a>
  </section>
`;

export default detailViewTemplate;
