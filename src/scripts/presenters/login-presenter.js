import Swal from 'sweetalert2';
import AuthApi from '../api/auth.js';
import LoginView from '../views/Loginview.js';

class LoginPresenter {
  constructor({ view }) {
    this.view = view;
    this.init();
  }

  init() {
    this.view.onLoginSubmit(this.handleLogin.bind(this));
  }

  async handleLogin(email, password) {
    try {
      const result = await AuthApi.login(email, password);
      localStorage.setItem('token', result.token);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You are now logged in!',
      });

      window.location.hash = '#/stories';
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Invalid credentials.',
      });
    }
  }
}

export default LoginPresenter;
