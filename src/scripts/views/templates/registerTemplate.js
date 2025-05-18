const registerTemplate = `
  <section class="register-section" style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f7f7f7;">
    <div class="register-container" style="max-width: 400px; width: 100%; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <form id="register-form" class="register-form" novalidate>
        <h2 style="text-align: center; margin-bottom: 1.5rem;">Create an Account</h2>

        <!-- Name Input -->
        <input type="text" id="name" placeholder="Name" aria-label="Name" required style="width: 100%; padding: 10px; margin-bottom: 1rem; border-radius: 5px; border: 1px solid #ccc;" />

        <!-- Email Input -->
        <input type="email" id="email" placeholder="Email" aria-label="Email" required style="width: 100%; padding: 10px; margin-bottom: 1rem; border-radius: 5px; border: 1px solid #ccc;" />

        <!-- Password Input -->
        <input type="password" id="password" placeholder="Password" aria-label="Password" required style="width: 100%; padding: 10px; margin-bottom: 1rem; border-radius: 5px; border: 1px solid #ccc;" />

        <!-- Confirm Password Input -->
        <input type="password" id="confirm-password" placeholder="Confirm Password" aria-label="Confirm Password" required style="width: 100%; padding: 10px; margin-bottom: 1rem; border-radius: 5px; border: 1px solid #ccc;" />

        <!-- Error Message -->
        <p id="error-message" style="color: red; font-size: 0.9rem; text-align: center; display: none;"></p>

        <!-- Submit Button -->
        <button type="submit" style="width: 100%; padding: 12px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Register
        </button>

        <!-- Loading Indicator -->
        <div id="loading-indicator" class="loading-indicator" style="display: none; text-align: center; margin-top: 10px;">⏳ Registering...</div>

        <!-- Login Link -->
        <a href="#/login" style="display: block; text-align: center; margin-top: 1rem; color: #007bff;">Already have an account? Login</a>
      </form>
    </div>
  </section>
`;

export default registerTemplate;
