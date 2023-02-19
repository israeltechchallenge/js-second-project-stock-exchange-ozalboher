const userInput = document.querySelector(".s-text-input");
const searchBtn = document.querySelector(".s-btn");
const ul = document.querySelector("ul");
const div = document.querySelector("div");
let isPrev = false;



function deletePrevList() {
  const allLinks = document.querySelectorAll("li");
  ul.innerHTML = "";
}

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

function displayList(data, logos, i = 0) {
  console.log(data);
  data.forEach((element) => {
    if (i < 10) {
      console.log(element);
      const li = document.createElement("li");
      const a = document.createElement("a");
      const img = document.createElement('img');
      img.classList.add('logo');
      img.src = logos.src[i];
      a.href = `company.html?symbol=${element.symbol}`;
      a.textContent = element.name;
      a.textContent += `(${element.symbol})`;
      a.textContent += '  ';
      a.textContent += `(${logos.percent[i]}%)`;
      li.appendChild(img);
      li.appendChild(a);
      ul.appendChild(li);
      i++;
    }
  });
  isPrev = true;
}

async function getSearchResults(userInput) {
  try {
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${userInput}&amp;limit=10&amp;exchange=NASDAQ`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
async function getResultsLogo(searchResults) {
  const arr = {
    src:[],
    percent:[],
  };
  let i = 0;
  console.log(searchResults)
   for (let i = 0; i < 10; i ++){
      try {
        const response = await fetch(
          `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${searchResults[i].symbol}`
        );
        const data = await response.json();
        const percentageValue = data.profile.changesPercentage.substr(0, 5);
        arr.percent.push(percentageValue);
        arr.src.push(data.profile.image);
      } catch (error) {
        arr.percent.push('');
        arr.src.push(searchResults[i].symbol);
        console.error(error);
      }
   }
   console.log(searchResults[0]);
   console.log(arr.length)
return arr;
}

userInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) searchBtn.click();
});

searchBtn.addEventListener("click", () => {
  main(userInput.value);
});

  //main
  async function main(userInput){
    if (userInput === "") {
      deletePrevList();
      return alert("Empty Field");
    }
    progressBar();

    const searchResults = await getSearchResults(userInput); // getSearchResults


    const resultsLogo = await getResultsLogo(searchResults); // getResultsLogo
    removeProgressBar();
    if (isPrev === false) displayList(searchResults, resultsLogo);
    else {
      deletePrevList();
      displayList(searchResults, resultsLogo);
    }
    
    
  }



