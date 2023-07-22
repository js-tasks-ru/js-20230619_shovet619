export default class DoubleSlider {
    element = null
    values = {}
    defaultSelected = {
      from: null,
      to: null
    }

    constructor(options = {}) {
      const { 
        min = 100,
        max = 200,
        formatValue = (value) => value,
        selected = this.defaultSelected
      } = options;

      this.min = min;
      this.max = max;
      this.formatValue = formatValue;
      this.selected = selected;

      this.initialize();
    }

    initialize() {
      const { from, to } = this.selected;
      this.element = this.createSliderElement(from, to);
      this.initializeSubElements();
      this.addListeners();
    }
    
    initializeSubElements() {
      this.subElements = {
        body: this.element
      };
      const elements = this.element.querySelectorAll('[data-element]');
      elements.forEach(element => this.subElements[element.dataset.element] = element);
    }
    
    addListeners() {
      this.subElements.left.addEventListener("pointerdown", this.onPointerDown.bind(this));
      this.subElements.right.addEventListener("pointerdown", this.onPointerDown.bind(this));

      this.subElements.left.ondragstart = false;
      this.subElements.right.ondragstart = false;
    }

    onPointerDown(event) {
      event.preventDefault();
      this.currTarget = event.target;
      this.handlePointerDown = this.onPointerMove.bind(this);
      document.addEventListener("pointermove", this.handlePointerDown);
      document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerMove(event) {
      const {width, x = 0} = this.subElements.range.getBoundingClientRect();
      const relation = width / (this.max - this.min);
      const slideAmount = Math.floor((event.clientX - x) / relation);
    
      const side = {
        left: "from",
        right: "to"
      };

      const element = this.currTarget.dataset.element;

      this.subElements[side[element]].innerHTML = this.formatValue(this.min + slideAmount);
      this.subElements[element].style.left = slideAmount + "%"; 

      this.values[side[element]] = this.min + slideAmount;

      const progressPosition = element === "left" ? slideAmount + "%" : 100 - slideAmount + "%";
      this.subElements.progress.style[element] = progressPosition;
    }

    onPointerUp = () => {
      this.subElements.body.dispatchEvent(new CustomEvent('range-select', {
        detail: this.values,
        bubbles: true
      }));
      document.removeEventListener("pointermove", this.handlePointerDown);
    }

    createSliderElement(from, to) {
      const fromValue = from ? from : this.min;
      const toValue = to ? to : this.max;

      this.values = {
        from: fromValue,
        to: toValue
      };
      
      const template = `
        <div class="range-slider">
            <span data-element="from">${this.formatValue(fromValue)}</span>
            <div class="range-slider__inner" data-element="range">
            <span data-element="progress" class="range-slider__progress" style="left: ${from}%; right: ${to}%"></span>
            <span data-element="left" class="range-slider__thumb-left"></span>
            <span data-element="right" class="range-slider__thumb-right"></span>
            </div>
            <span data-element="to">${this.formatValue(toValue)}</span>
        </div>
        `;
      const sliderElement = document.createElement("div");
      sliderElement.innerHTML = template.trim();
      return sliderElement.firstChild;
    }

    remove() {
        this.element?.remove();
    }

    removeListeners() {
      document.removeEventListener("pointermove", this.onPointerUp);
    }

    destroy() {
      this.remove();
      this.removeListeners();
      this.element = null;
    }
}
