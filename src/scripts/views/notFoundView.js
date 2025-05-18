const NotFoundView = {
  render() {
    return `
      <div class="not-found">
        <h2>404 - Halaman Tidak Ditemukan</h2>
        <p>Halaman yang kamu tuju tidak tersedia.</p>
        <a href="#/login" class="back-home">Kembali ke Beranda</a>
      </div>
    `;
  }
};

export default NotFoundView;

