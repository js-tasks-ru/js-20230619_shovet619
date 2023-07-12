export default class NotificationMessage {
  static uniqueElement = null;
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
    if (NotificationMessage.uniqueElement) {
      NotificationMessage.uniqueElement.remove();
    }
    targetElement.append(this.element);
    NotificationMessage.uniqueElement = this.element;
    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  destroy() {
    this.element = null;
  }

  remove() {
    this.element.remove();
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
    const messageElement = document.createElement('div');
    messageElement.innerHTML = template.trim();
    return messageElement.firstChild;
  }
}
