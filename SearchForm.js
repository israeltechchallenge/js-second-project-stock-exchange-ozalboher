const baseUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";

class SearchForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.userInput = this.formElement.querySelector(".s-text-input");
    this.searchBtn = this.formElement.querySelector(".s-btn");
    this.ul = document.querySelector('ul');
    this.formURL = `${baseUrl}search?query=`;
    this.debounceTimer;
    this.InputEventListener();
  }
  //Event Listeners
  InputEventListener() {
    this.userInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        clearTimeout(this.debounceTimer);
        this.searchBtn.click();
      }
    });
    this.userInput.addEventListener("input", (e) => {
      this.debounce(e.target.value);
      if (this.userInput === "") {
        deletePrevList();
        clearTimeout(this.debounceTimer);
      }
    });
    this.searchBtn.addEventListener("click", () => {
      this.main(this.userInput.value);
    });
  }

  debounce(e) {
    clearTimeout(this.debounceTimer);
    this.deletePrevList();

    this.debounceTimer = setTimeout(this.main, 1000, e);
  }

  // Delete List
  deletePrevList() {
    this.ul.innerHTML = "";
  }

// Progress Bar functions
 progressBar(value, width = 0) {
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
  removeProgressBar() {
  let elem = document.querySelector(".loader-bar");
  setTimeout(() => {
    elem.classList.remove("move");
  }, 300);
}

async getSearchResults(userInput) {
  try {
    const response = await fetch(`${baseUrl}search?query=${userInput}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async getResultsLogo(searchResults) {
  const arr = {
    src: [],
    percent: [],
  };
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


  async main(userInput) {
    this.progressBar(40); // Load progress bar

    const searchResults = await this.getSearchResults(userInput); // getSearchResults

    this.progressBar(70, 40); // Continue Load progress bar

    const resultsLogo = await this.getResultsLogo(searchResults); // getResultsLogo

    this.progressBar(100, 70); // Continue Load progress bar
    this.removeProgressBar(); // Clear progress bar
    this.deletePrevList(); // Delete Prev List

    const displayRes = new SearchResults(this.ul);
    displayRes.displayList(searchResults, resultsLogo); // Display results with logo
  }
}
