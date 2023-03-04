
class MarqueeGenerator {
  constructor(marqueeURL, marqueeElement) {
    this.marqueeURL = marqueeURL;
    this.marqueeElement = marqueeElement;
  }

  async getMarqueeData() {
    try {
      const response = await fetch(this.marqueeURL);
      const data = await response.json();
        return data;
      }
     catch (error) {
      console.log(error);
    }
  }

  displayMarqueeData(data) {
    for (let i = 0; i < 60; i++) {
    const company = data[i];
    const symbol = company.symbol;
    const price = company.price;
    const textElement = document.createElement("span");
    textElement.textContent = ` ${symbol} ${price} `;
    this.marqueeElement.appendChild(textElement);
    }
  }
}

// main
const marqueeURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/` + "stock/list";
const marqueeElement = document.querySelector(".marquee-text");

(async () => {
const marqueeInstance = new MarqueeGenerator(marqueeURL, marqueeElement);
const marqueeData = await marqueeInstance.getMarqueeData();
marqueeInstance.displayMarqueeData(marqueeData);
})();
