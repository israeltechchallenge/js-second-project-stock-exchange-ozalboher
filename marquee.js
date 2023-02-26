const marqueeURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/` + "stock/list";
const marqueeElement = document.querySelector(".marquee-text");

async function getMarqueeData() {
  try {
    const response = await fetch(marqueeURL);
    const data = await response.json();
    for (let i = 0; i < 60; i++) {
      const company = data[i];
      displayMarqueeData(company);
    }
   
  } catch (error) {
    console.log(error);
  }
}

function displayMarqueeData(company) {
  const symbol = company.symbol;
  const price = company.price;
  const textElement = document.createElement("span");
  textElement.textContent = ` ${symbol} ${price} `;
  marqueeElement.appendChild(textElement);
}

getMarqueeData();



