// src/views/RegisterView.js
import registerTemplate from "./templates/registerTemplate"; // Import dipertahankan, tapi tidak dipakai

const RegisterView = {
  render() {
    return `
      <section id="main-content" class="register-area" tabindex="-1" aria-label="Registration Section">
        <form id="register-form" class="form-container" novalidate>
          <div class="form-field">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" required aria-required="true" aria-describedby="name-desc" placeholder="Enter your name" />
            <span id="name-desc" class="sr-only">Type your full name</span>
          </div>

          <div class="form-field">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" required aria-required="true" aria-describedby="email-desc" placeholder="Enter your email" />
            <span id="email-desc" class="sr-only">Provide a valid email</span>
          </div>

          <div class="form-field" style="position: relative;">
            <label for="password">Create Password</label>
            <input type="password" id="password" name="password" required minlength="6" aria-required="true" aria-describedby="pass-desc" placeholder="Enter password" />
            <button type="button" id="show-password" aria-label="Show password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;">👁️</button>
            <span id="pass-desc" class="sr-only">Minimum 6 characters</span>
          </div>

          <button type="submit">Sign Up</button>
          <p>
            <a href="#/login">Have an account? Login here</a>
          </p>
        </form>
      </section>
    `;
  },

  onRegisterSubmit(callback) {
    setTimeout(() => {
      const form = document.querySelector('#register-form');
      if (!form) return;

      const nameInput = form.querySelector('#name');
      const emailInput = form.querySelector('#email');
      const passwordInput = form.querySelector('#password');
      const toggleBtn = form.querySelector('#show-password');

      toggleBtn?.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        toggleBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
        toggleBtn.textContent = isHidden ? '🙈' : '👁️';
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!nameInput.checkValidity()) return nameInput.focus();
        if (!emailInput.checkValidity()) return emailInput.focus();
        if (!passwordInput.checkValidity()) return passwordInput.focus();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        callback(name, email, password);
      });
    }, 0);
  }
};

export default RegisterView;
