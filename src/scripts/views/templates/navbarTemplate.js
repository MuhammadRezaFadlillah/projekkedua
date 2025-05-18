// src/views/templates/navbarTemplate.js
const navbarTemplate = (logoImg, isLoggedIn, userName, userEmail) => `
  <div class="navbar-inner">
    <div class="navbar-logo">
      <img src="${logoImg}" alt="Logo" class="navbar-logo-img" />
      <span class="navbar-logo-text">ShineStory</span>
    </div>

    <nav class="navbar-menu">
      <a href="#/stories" class="navbar-button">🏠 Home</a>
      <a href="#/add" class="navbar-button">➕ Add Story</a>
      ${
        isLoggedIn
          ? ` 
            <span class="navbar-user">
              Welcome, ${userName} 👋<br />
              Email: ${userEmail}
              <button id="logout-btn" class="navbar-button navbar-button-box">🚪 Sign Out</button>
              <button id="notify-btn" class="navbar-button navbar-button-box">🔔 Aktifkan Notifikasi</button>
            </span>`
          : '<a href="#/login" class="navbar-button navbar-button-box">🔐 Log In</a>'
      }
    </nav>
  </div>
`;

export default navbarTemplate;
