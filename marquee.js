
class MarqueeGenerator {
  constructor(marqueeElement) {
    this.marqueeElement = marqueeElement;
    this.marqueeURL = `${baseUrl}stock/list`;
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
    let marqueeText = document.createElement('p');
    marqueeText.classList.add('marquee-text');
    marqueeText.classList.add('colors');
    
    for (let i = 0; i < 60; i++) {
    const company = data[i];
    const symbol = company.symbol;
    const price = company.price;
    const textElement = document.createElement("span");
    textElement.textContent = ` ${symbol} ${price} `;
    marqueeText.appendChild(textElement);
    this.marqueeElement.appendChild(marqueeText);
    }
  }

  async start(){
    this.getMarqueeData().then(data => this.displayMarqueeData(data));
  }
}







