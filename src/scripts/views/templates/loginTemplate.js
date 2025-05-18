// src/templates/loginTemplate.js
const loginTemplate = (logoImg) => `
  <section id="main-content" tabindex="-1" class="login-section" style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f7f7f7;">
    <div class="login-container" style="max-width: 400px; width: 100%; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <form id="login-form" class="login-form fade-in-up" novalidate>
        <div class="login-logo-container" style="text-align: center; margin-bottom: 1rem;">
          <img src="${logoImg}" alt="Logo" class="login-logo" style="max-width: 150px;" />
        </div>
        <h2 style="text-align: center; margin-bottom: 1.5rem;">Login</h2>

        <!-- Email Input -->
        <input type="email" id="email" placeholder="Email" aria-label="Email" required style="width: 100%; padding: 10px; margin-bottom: 1rem; border-radius: 5px; border: 1px solid #ccc;" />

        <!-- Password Input -->
        <input type="password" id="password" placeholder="Password" aria-label="Password" required style="width: 100%; padding: 10px; margin-bottom: 1rem; border-radius: 5px; border: 1px solid #ccc;" />

        <!-- Error Message -->
        <p id="error-message" style="color: red; font-size: 0.9rem; text-align: center; display: none;"></p>

        <!-- Submit Button -->
        <button type="submit" style="width: 100%; padding: 12px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Login
        </button>

        <!-- Loading Indicator -->
        <div id="loading-indicator" class="loading-indicator" style="display: none; text-align: center; margin-top: 10px;">⏳ Logging in...</div>

        <!-- Register Link -->
        <a href="#/register" style="display: block; text-align: center; margin-top: 1rem; color: #007bff;">Don't have an account? Register</a>
      </form>
    </div>
  </section>
`;

export default loginTemplate;
