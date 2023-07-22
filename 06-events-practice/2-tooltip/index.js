class Tooltip {
  static tooltip = null
  element = null
  mounted = false
  listeners = []

  constructor() {
    if (Tooltip.tooltip) {return Tooltip.tooltip;}
    Tooltip.tooltip = this;
  }

  initialize () {
    this.element = document.createElement("div");
    this.element.className = "tooltip";
    this.addListeners();
  }

  render() {
    document.body.append(this.element);
    this.mounted = true;
  }

  update(message, coords) {
    this.element.hidden = false;
    this.element.innerHTML = message;
    this.moveAt(coords.x, coords.y);
  }

  moveAt(pageX, pageY) {
    this.element.style.left = pageX + this.element.offsetWidth / 3 + 'px';
    this.element.style.top = pageY + this.element.offsetHeight / 3 + 'px';
  }

  onMouseMove(event) {
    if (!this.element) {return;}
    this.moveAt(event.pageX, event.pageY);
  }

  onMoveIn(event) {
    if (event.target?.tagName === "DIV") {
      if (!this.mounted) {this.render();}
      this.update(event.target.dataset.tooltip, { x: event.pageX, y: event.pageY});
    }
  }

  onMoveOut(event) {
    if (event.relatedTarget?.tagName !== "DIV") {
      this.remove();
    }
  }

  addListeners() {
    const pointerOverHandler = this.onMoveIn.bind(this);
    const pointerOutHandler = this.onMoveOut.bind(this);
    const mouseMoveHandler = this.onMouseMove.bind(this);

    this.listeners = [
      {
        type: "pointerover",
        handler: pointerOverHandler
      },
      {
        type: "pointerout",
        handler: pointerOutHandler
      },
      {
        type: "mousemove",
        handler: mouseMoveHandler
      },
    ];

    this.listeners.forEach(({type, handler}) => document.addEventListener(type, handler));
    
  }

  removeListeners() {
    this.listeners.forEach(({ type, handler }) => document.removeEventListener(type, handler));
  }

  remove() {
    this.element?.remove();
    this.mounted = false;
  }

  destroy() {
    this.remove();
    this.removeListeners();
    this.element = null;
  }
}

export default Tooltip;
