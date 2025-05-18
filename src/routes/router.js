// Views
import LoginView from '../scripts/views/Loginview.js';
import RegisterView from '../scripts/views/RegisterView.js';
import StoryView from '../scripts/views/StoryView.js';
import AddView from '../scripts/views/AddForm.js';
import DetailView from '../scripts/views/DetailView.js';
import FooterView from '../scripts/views/FooterView.js';
import NavbarView from '../scripts/views/NavbarView.js';
import storyTemplate from '../scripts/views/templates/storyTemplate.js';
import NotFoundView from '../scripts/views/notFoundView.js'; // Tambahan

import LoginPresenter from '../scripts/presenters/login-presenter.js';
import RegisterPresenter from '../scripts/presenters/register-presenter.js';
import StoryPresenter from '../scripts/presenters/story-presenter.js';
import AddPresenter from '../scripts/presenters/add-presenter.js';
import DetailPresenter from '../scripts/presenters/detail-presenter.js';

const routes = {
  '/login': {
    view: LoginView,
    presenter: LoginPresenter,
  },
  '/register': {
    view: RegisterView,
    presenter: RegisterPresenter,
  },
  '/stories': {
    view: StoryView,
    presenter: StoryPresenter,
  },
  '/add': {
    view: AddView,
    presenter: AddPresenter,
  },
};

// ✅ Fungsi animasi transisi halaman
const animatePageTransition = async (callback) => {
  const oldContent = document.getElementById('main-content');

  if (oldContent) {
    await oldContent.animate([
      { opacity: 1, transform: 'translateY(0px)' },
      { opacity: 0, transform: 'translateY(20px)' }
    ], {
      duration: 300,
      easing: 'ease-in',
      fill: 'forwards',
    }).finished;
  }

  callback();

  const newContent = document.getElementById('main-content');
  if (newContent) {
    newContent.animate([
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0px)' }
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards',
    });
  }
};

const renderPage = () => {
  const app = document.getElementById('app');
  const hash = window.location.hash.slice(1) || '/login';
  app.innerHTML = '';

  const isAuthPage = hash === '/login' || hash === '/register';

  // ✅ Cek jika halaman detail story
  const storyDetailRegex = /^\/stories\/(.+)/;
  const matchDetail = hash.match(storyDetailRegex);

  if (matchDetail) {
    const id = matchDetail[1];

    if (!isAuthPage) {
      const navbar = new NavbarView();
      app.appendChild(navbar.render());
    }

    const container = document.createElement('div');
    container.setAttribute('id', 'main-content');
    container.setAttribute('tabindex', '-1');
    container.innerHTML = DetailView.render();
    app.appendChild(container);

    new DetailPresenter({ view: DetailView, id });

    if (!isAuthPage) {
      const footer = new FooterView();
      app.appendChild(footer.render());
    }

    return;
  }

  const route = routes[hash];

  if (!route) {
    if (!isAuthPage) {
      const navbar = new NavbarView();
      app.appendChild(navbar.render());
    }

    const container = document.createElement('div');
    container.setAttribute('id', 'main-content');
    container.setAttribute('tabindex', '-1');
    container.innerHTML = NotFoundView.render(); // render 404
    app.appendChild(container);

    if (!isAuthPage) {
      const footer = new FooterView();
      app.appendChild(footer.render());
    }

    return;
  }

  if (!isAuthPage) {
    const navbar = new NavbarView();
    app.appendChild(navbar.render());
  }

  const container = document.createElement('div');
  container.setAttribute('id', 'main-content');
  container.setAttribute('tabindex', '-1');
  container.innerHTML = route.view.render();
  app.appendChild(container);

  new route.presenter({ view: route.view });

  if (!isAuthPage) {
    const footer = new FooterView();
    app.appendChild(footer.render());
  }
};

// ✅ Gunakan View Transition API jika tersedia + animasi fallback
const router = () => {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      animatePageTransition(renderPage);
    });
  } else {
    animatePageTransition(renderPage);
  }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// ✅ Aksesibilitas: Skip link
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('skip-link')) {
    e.preventDefault();

    const targetId = e.target.getAttribute('href')?.replace('#', '');
    const target = document.getElementById(targetId);

    if (target) {
      setTimeout(() => {
        target.setAttribute('tabindex', '-1');
        target.focus();
      }, 0);
    }
  }
});

export default router;
