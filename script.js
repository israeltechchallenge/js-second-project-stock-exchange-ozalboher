
const baseUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";

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





