export default class NotificationMessage {
  element = null

  constructor(message = "", options = {}) {
    const {duration = 1000, type = "success"} = options;
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.render();
  }

  render() {
    this.element = this.createMessageElement(this.message, this.type, this.duration);
  }

  show(targetElement = document.body) {
    targetElement.append(this.element);
    this.remove();
  }

  destroy() {
    this.element = null;
  }

  remove() {
    setTimeout(() => {
      this.element.remove();
    }, this.duration);
  }

  createMessageElement(message, type, duration) {
    const template = `
        <div class="notification ${type}" style="--value:${duration}ms">
        <div class="timer"></div>
        <div class="inner-wrapper">
        <div class="notification-header">${type}</div>
        <div class="notification-body">
            ${message}
        </div>
        </div>
    </div>
    `;
    const messageElement = document.createElement('template');
    messageElement.innerHTML = template.trim();
    return messageElement.content.firstChild;
  }
}
