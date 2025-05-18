import logo from '../../assets/images/logo.jpg';
import loginTemplate from '../views/templates/loginTemplate.js';

const LoginView = {
  render() {
    return `
      <section id="main-content" tabindex="-1" class="login-section" aria-label="Login page">
        <form id="login-form" class="login-form" novalidate>
          <div class="login-logo-container">
            <img src="${logo}" alt="App Logo" class="login-logo" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              aria-required="true"
              aria-describedby="emailHelp"
              required
            />
            <span id="emailHelp" class="visually-hidden">Enter your email address</span>
          </div>

          <div class="form-group" style="position: relative;">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              aria-required="true"
              aria-describedby="passwordHelp"
              required
              minlength="6"
            />
            <button
              type="button"
              id="toggle-password"
              aria-label="Show password"
              style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem;"
            >
              🧿
            </button>
            <span id="passwordHelp" class="visually-hidden">Enter your password, minimum 6 characters</span>
          </div>

          <button type="submit">Login</button>
          <p>
            <a href="#/register">Don't have an account? Register</a>
          </p>
        </form>
      </section>
    `;
  },

  onLoginSubmit(callback) {
    setTimeout(() => {
      const form = document.querySelector('#login-form');
      if (!form) return;

      const passwordInput = form.querySelector('#password');
      const toggleBtn = form.querySelector('#toggle-password');

      toggleBtn.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          toggleBtn.setAttribute('aria-label', 'Hide password');
          toggleBtn.textContent = '🚫';
        } else {
          passwordInput.type = 'password';
          toggleBtn.setAttribute('aria-label', 'Show password');
          toggleBtn.textContent = '🧿';
        }
      });

      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailInput = form.querySelector('#email');

        if (!emailInput.checkValidity()) {
          emailInput.focus();
          return;
        }
        if (!passwordInput.checkValidity()) {
          passwordInput.focus();
          return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        callback(email, password);
      });
    }, 0);
  }
};

export default LoginView;
