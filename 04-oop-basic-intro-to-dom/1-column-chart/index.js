export default class ColumnChart {
  element = null;

  constructor(options = {}) {
    const {
      data = [], 
      value = "", 
      link = "", 
      label = "", 
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
    const oldChartElement = this.element.getElementsByClassName("column-chart__container")[0];
    const newChartElement = this.drawChart(data, this.value);
    this.element.replaceChild(newChartElement, oldChartElement);
  }

  render() {
    const rootElement = this.createRootElement();
    const titleElement = this.createTitleElement(this.label);
    if (this.link) {
      const linkElement = this.createLinkElement(this.link);
      titleElement.append(linkElement);
    }

    const chartElement = this.drawChart(this.data, this.value, this.formatHeading);

    rootElement.appendChild(titleElement);
    rootElement.appendChild(chartElement);

    this.element = rootElement;
  }

  drawChart(data, title, formatHeading) {    
    const chartContainerElement = this.creatChartContainerElement();
    const headerElement = this.createHeaderElement(formatHeading, title);
    const chartElement = this.createChartElement();
    chartContainerElement.appendChild(headerElement);

    data.forEach((value) => {
      const columnElement = this.createColumnElement(value);
      chartElement.appendChild(columnElement);
    });

    chartContainerElement.appendChild(chartElement);
    return chartContainerElement;
  }

  createRootElement() {
    const className = this.data.length === 0 ? "column-chart_loading column-chart" : "column-chart";
    const rootElement = document.createElement("div");
    rootElement.className = className;
    return rootElement;
  }

  createColumnElement(value) {
    const columnElement = document.createElement("div");
    const columnValue = this.getColumnValue(value);
    const columnPercent = this.getColumnPercent(value);
    columnElement.style = `--value: ${columnValue}`;
    columnElement.setAttribute('data-tooltip', columnPercent);
    return columnElement;
  }

  createChartElement() {
    const chartElement = document.createElement("div");
    chartElement.className = "column-chart__chart";
    return chartElement;
  }

  creatChartContainerElement() {
    const chartContainerElement = document.createElement("div");
    chartContainerElement.className = "column-chart__container";
    return chartContainerElement;
  }

  createLinkElement(link) {
    const linkElement = document.createElement("div");
    linkElement.className = "column-chart__link";
    linkElement.innerText = "View all";
    linkElement.href = link;
    return linkElement;
  }

  createTitleElement(label) {
    const titleElement = document.createElement("div");
    titleElement.className = "column-chart__title";
    titleElement.innerHTML = label;
    return titleElement;
  }

  createHeaderElement(formatHeading, title) {
    const headerElement = document.createElement("div");
    headerElement.className = "column-chart__header";
    headerElement.innerHTML = formatHeading ? formatHeading(title) : title;
    return headerElement;
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
}
