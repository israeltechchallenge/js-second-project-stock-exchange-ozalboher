function progressBar(width = 0) {
    let elem = document.querySelector(".loader-bar");
    elem.classList.add("move");
    let id = setInterval(frame, 1);
    function frame() {
      if (width >= 70) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
  function removeProgressBar(width = 70) {
    let elem = document.querySelector(".loader-bar");
    elem.classList.add("move");
    let id = setInterval(frame, 1);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
    setTimeout(() => {
      elem.classList.remove("move");
    }, 300);
  }

  async function getStockHistory(symbol) {
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  function displayStockHistory(data) {
    const length = data.historical.length;

    let labels = [];
    let values = [];
    for (i = 0; i < length; i++) {
      labels.push(data.historical[i].date);
      values.push(data.historical[i].close);
    }
    values = values.reverse();
    labels.sort((a, b) => new Date(a) - new Date(b));

    new Chart(document.getElementById("myChart"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Close Price",
            data: values,
            backgroundColor: "#303134",
            fill: true,
          },
        ],
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "Stock Price Historical Data",
        },
        scales: {
          y: {
            position: "left",
            beginAtZero: true,
          },
        },
      },
    });
  }

  function displayCompany(data) {
    const companyLogo = document.querySelector(".company-logo");
    const companyName = document.querySelector(".company-name");
    const companyWebsite = document.querySelector(".company-website");
    const companyDesc = document.querySelector(".company-desc");
    const stockPrice = document.querySelector(".stock-price");
    const percetage = document.querySelector(".percentage");

    companyLogo.alt = `${data.profile.companyName}logo`;
    companyLogo.src = data.profile.image;

    companyName.innerHTML = data.profile.companyName;

    companyWebsite.href = data.profile.website;
    companyWebsite.textContent = "Visit Website";

    companyDesc.innerHTML = data.profile.description;

    stockPrice.innerHTML = `STOCK PRICE&nbsp ${data.profile.price}$`;

    const percentageValue = data.profile.changesPercentage;
    percetage.innerHTML = `${percentageValue.substr(0, 5)}%`;
    if (+percentageValue < 0) percetage.classList.add("red");
    else percetage.classList.add("green");
  }

  async function getCompanyProfile(symbol) {
    console.log(symbol);
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // Get Query
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  //Main
  (async () => {
    progressBar();
    const companyProfile = await getCompanyProfile(params.symbol);
    displayCompany(companyProfile);
    const stockHistory = await getStockHistory(params.symbol);
    displayStockHistory(stockHistory);
    removeProgressBar();
  })();