export default class MoreButton {
  constructor() {
    this.button = document.querySelector('.load-more');
  }

  show() {
    this.button.classList.remove('is-hidden');
    console.log(this.button);
  }
}
