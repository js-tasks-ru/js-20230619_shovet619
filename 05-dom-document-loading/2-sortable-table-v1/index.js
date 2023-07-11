export default class SortableTable {
  element = null
  root = null
  subElements = null

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.render();
  }

  render() {
    const headerElement = this.createHeader(this.headerConfig);
    const tableElement = this.createTableBody(this.data);
    const rootElement = this.createRootElement(headerElement, tableElement);
    this.element = rootElement;
    this.subElements = {
      body: this.element.firstElementChild.children[1]
    }
  }

  update() {
    if (!this.root) {
      this.root = this.element.parentNode
    }
    this.render()
    this.root.replaceChild(this.element, this.root.firstChild)
  }

  createRootElement(header, table) {
    const template = `
      <div data-element="productsContainer" class="products-list__container">
      <div class="sortable-table">
        ${header}
        ${table}
      </div>
      </div>
    `;
    const rootElement = document.createElement('template');
    rootElement.innerHTML = template.trim();
    return rootElement.content.firstChild;
  }

  createHeader(headerConfig) {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${headerConfig.map(item => `
            <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="asc">
            <span>${item.title}</span>
            ${item.sortable 
              ? `<span data-element="arrow" class="sortable-table__sort-arrow">
                  <span class="sort-arrow"></span>
                </span>` 
              : ""}
          </div>
            `
          ).join(' ')}
      </div>
    `;
  }

  createTableBody(data) {
    return `
      <div data-element="body" class="sortable-table__body">
          ${data.map(item => `
            <a href="/products/${item.id}" class="sortable-table__row">
              <div class="sortable-table__cell">
                ${item.images?.map(image => `
                    <img class="sortable-table-image" alt="Image" src="${image.url}">
                `).join(' ')}
              </div>
              <div class="sortable-table__cell">${item.title}</div>
      
              <div class="sortable-table__cell">${item.quantity}</div>
              <div class="sortable-table__cell">${item.price}</div>
              <div class="sortable-table__cell">${item.sales}</div>
            </a>
          `).join(' ')}
      </div>
    `;
  }

  sort(fieldValue, orderValue) {
    const sortType = this.headerConfig.find(item => item.id === fieldValue).sortType
    const sortAscending = (a, b) => a[fieldValue] - b[fieldValue];
    const sortDescending = (a, b) => b[fieldValue] - a[fieldValue];
    const sortStringAscending = (a, b) => a[fieldValue].localeCompare(b[fieldValue], "ru");
    const sortStringDescending = (a, b) => b[fieldValue].localeCompare(a[fieldValue], "ru");
    
    if (sortType === "number") {
      this.data.sort(orderValue === "asc" ? sortAscending : sortDescending)
    } else {
      this.data.sort(orderValue === "asc" ? sortStringAscending : sortStringDescending)
    }
    this.update()
  }

  destroy() {
    this.element = null;
  }

  remove() {
    this.destroy();
  }
}

