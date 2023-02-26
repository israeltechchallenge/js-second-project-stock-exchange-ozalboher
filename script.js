const userInput = document.querySelector(".s-text-input");
const searchBtn = document.querySelector(".s-btn");
const ul = document.querySelector("ul");
const div = document.querySelector("div");
let debounceTimer;
let isPrev = false;
let indexUrl;

const baseUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";

// Add Query Parameter

function addOrUpdateURLParam(key, value) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  const newRelativePathQuery =
    window.location.pathname + "?" + searchParams.toString();
  history.pushState(null, null, newRelativePathQuery);
}
// Get Query

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (params.query !== undefined) {
  main(params.query);
}
// Debounce

const debounce = (e) => {
  clearTimeout(debounceTimer);
  deletePrevList();

  debounceTimer = setTimeout(main, 1000, e);
};
// Delete List

function deletePrevList() {
  ul.innerHTML = "";
}

// Progress Bar functions

function progressBar(value, width = 0) {
  let elem = document.querySelector(".loader-bar");
  elem.classList.add("move");
  let id = setInterval(frame, 1);
  function frame() {
    if (width >= value) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + "%";
    }
  }
}
function removeProgressBar() {
  let elem = document.querySelector(".loader-bar");
  setTimeout(() => {
    elem.classList.remove("move");
  }, 300);
}
function displayList(data, logos, i = 0) {
  data.forEach((element) => {
    if (i < 10) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const img = document.createElement("img");
      img.classList.add("logo");
      img.src = logos.src[i];
      a.href = `company.html?symbol=${element.symbol}`;
      a.textContent = element.name;
      a.textContent += `(${element.symbol})`;
      a.textContent += "  ";
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
    const response = await fetch(`${baseUrl}search?query=${userInput}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
async function getResultsLogo(searchResults) {
  const arr = {
    src: [],
    percent: [],
  };
  let i = 0;
  for (let i = 0; i < 10; i++) {
    try {
      const response = await fetch(
        `${baseUrl}company/profile/${searchResults[i].symbol}`
      );
      const data = await response.json();
      const percentageValue = data.profile.changesPercentage.substr(0, 5);
      arr.percent.push(percentageValue);
      arr.src.push(data.profile.image);
    } catch (error) {
      arr.percent.push("");
      arr.src.push(searchResults[i].symbol);
      console.error(error);
    }
  }
  return arr;
}

userInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    clearTimeout(debounceTimer);
    searchBtn.click();
  }
});

userInput.addEventListener("input", (e) => {
  debounce(e.target.value);
  if (userInput === "") {
    deletePrevList();
    clearTimeout(debounceTimer);
  }
});

searchBtn.addEventListener("click", () => {
  addOrUpdateURLParam("query", userInput.value);
  main(userInput.value);
});


//main
async function main(userInput) {
  if (userInput === "") {
    deletePrevList();
    return alert("Empty Field");
  }
  progressBar(40); // Load progress bar

  const searchResults = await getSearchResults(userInput); // getSearchResults

  progressBar(70, 40); // Continue Load progress bar

  const resultsLogo = await getResultsLogo(searchResults); // getResultsLogo

  progressBar(100, 70); // Continue Load progress bar
  removeProgressBar(); // Clear progress bar
  deletePrevList(); // Delete Prev List
  displayList(searchResults, resultsLogo); // Display results with logo
  
  /* indexUrl = window.location.href.toString();   */
}



