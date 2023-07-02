export default class ColumnChart {
  element = null;
  classNamePrefix = "column-chart";

  constructor(options = {}) {
    const {
      data = [], 
      value, 
      link, 
      label, 
      formatHeading, 
      chartHeight = 50
    } = options;

    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.chartHeight = chartHeight;
    this.formatHeading = formatHeading;
    this.render();
  }

  update(data) {
    const oldChart = this.element.getElementsByClassName("column-chart__container")[0];
    const newChart = this.drawChart(data, this.value);
    this.element.replaceChild(newChart, oldChart);
  }

  render() {
    const containerClassName = this.data.length === 0 ? `${this.classNamePrefix}_loading ${this.classNamePrefix}` : this.classNamePrefix;
    const columnChart = document.createElement('div');
    columnChart.className = containerClassName;

    const title = this.createElementWithClassname("div", "title");
    title.innerHTML = this.label;

    const link = this.createLink();

    if (link) {title.appendChild(link);}

    const chart = this.drawChart(this.data, this.value);

    columnChart.appendChild(title);
    columnChart.appendChild(chart);

    this.element = columnChart;
  }

  drawChart(data, title) {    
    const container = this.createElementWithClassname("div", "container");

    const header = this.createElementWithClassname("div", "header");
    header.innerHTML = this.formatHeading ? this.formatHeading(title) : title;
   
    const chart = this.createElementWithClassname("div", "chart");

    container.appendChild(header);

    data.forEach((value) => {
      const column = document.createElement("div");
      const columnValue = this.getColumnValue(value);
      const columnPercent = this.getColumnPercent(value);
      column.style = `--value: ${columnValue}`;
      column.setAttribute('data-tooltip', columnPercent);
      chart.appendChild(column);
    });
    container.appendChild(chart);

    return container;
  }

  createLink() {
    if (!this.link) {return;}

    const link = this.createElementWithClassname("a", "link");
    link.innerText = "View all";
    link.href = this.link;
    return link;
  }
  
  createElementWithClassname(tag, className = "") {
    const element = document.createElement(tag);
    element.className = this.createClassName(className);
    return element;
  }


  destroy() {
    this.element = null;
  }

  remove() {
    this.destroy();
  }

  getColumnValue(value) {
    const coef = Math.max(...this.data) / this.chartHeight;
    return Math.floor(value / coef);
  }

  getColumnPercent(value) {
    return (value / Math.max(...this.data) * 100).toFixed(0) + '%';
  }

  createClassName(name) {
    return `${this.classNamePrefix}__${name}`;
  }

}
