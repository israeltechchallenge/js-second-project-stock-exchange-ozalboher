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

function displayList(data, i = 0) {
  data.forEach((element) => {
    if (i < 10) {
      i++;
      console.log(element);
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `company.html?symbol=${element.symbol}`;
      a.textContent = element.name;
      a.textContent += `(${element.symbol})`;
      li.appendChild(a);
      ul.appendChild(li);
    }
  });

  isPrev = true;
}

async function getSearchResults(userInput) {
  if (userInput === "") {
    deletePrevList();
    return alert("Empty Field");
  }
  try {
    progressBar();
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${userInput}&amp;limit=10&amp;exchange=NASDAQ`
    );
    const data = await response.json();
    removeProgressBar();
    if (isPrev === false) displayList(data);
    else {
      deletePrevList();
      displayList(data);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

userInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) searchBtn.click();
});

searchBtn.addEventListener("click", () => {
  getSearchResults(userInput.value);
});
