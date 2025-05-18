const storyTemplate = `
  <section id="main-content" tabindex="-1" class="story-feed">
    <h2 tabindex="0">Daftar Cerita</h2>

    <div id="loading-indicator" class="loading-indicator">
      ⏳ Loading stories...
    </div>

    <div id="story-list" class="story-list" role="list" aria-label="Daftar cerita pengguna">
      <!-- Story Cards will go here -->
    </div>

    <div id="map-wrapper">
      <div id="map" aria-label="Peta lokasi cerita"></div>
    </div>
  </section>
`;

export default storyTemplate;
