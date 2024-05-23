document.querySelector('.sidebar-toggle').addEventListener('click', () => {
  document.querySelector('body').classList.toggle('sidebar-active');
});

document.querySelector('.sidebar-overlay').addEventListener('click', () => {
  document.querySelector('body').classList.remove('sidebar-active');
});
