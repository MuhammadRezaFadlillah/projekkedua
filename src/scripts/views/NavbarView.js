import logoImg from '../../assets/images/logo.jpg';

class NavbarView {
  constructor(logoText = '') {
    this.logoText = logoText;
    this.navbarElement = document.createElement('header');
    this.navbarElement.classList.add('navbar');
  }

  render() {
    const isLoggedIn = !!localStorage.getItem('token');
    const userName = localStorage.getItem('userName') || '';
    const userEmail = localStorage.getItem('userEmail') || '';

    this.navbarElement.innerHTML = `
      <div class="navbar-inner">
        <div class="navbar-logo">
          <img src="${logoImg}" alt="Logo" class="navbar-logo-img" />
          <span class="navbar-logo-text">${this.logoText}</span>
        </div>

        <nav class="navbar-menu">
          <a href="#/stories" class="navbar-button">🏠 Home</a>
          <a href="#/add" class="navbar-button">➕ Add Story</a>
          ${
            isLoggedIn
              ? `<button id="logout-btn" class="navbar-button">🚪 Logout</button>`
              : `<a href="#/login" class="navbar-button">🔐 Login</a>`
          }
        </nav>
      </div>
    `;

    if (isLoggedIn) {
      const logoutBtn = this.navbarElement.querySelector('#logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
          window.location.hash = '/login';
        });
      }
    }

    this._highlightActiveLink();

    return this.navbarElement;
  }

  _highlightActiveLink() {
    const links = this.navbarElement.querySelectorAll('.navbar-button[href]');
    const currentHash = window.location.hash;

    links.forEach((link) => {
      if (link.getAttribute('href') === currentHash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

export default NavbarView;
