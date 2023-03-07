class SearchResults{
  constructor(element){
    this.element = element;
    this.resultList = this.element;
    this.isPrev = false;
}

displayList(data, logos, i = 0) {
  data.forEach((e) => {
    if (i < 10) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const img = document.createElement("img");
      img.classList.add("logo");
      img.src = logos.src[i];
      a.href = `company.html?symbol=${e.symbol}`;
      a.textContent = e.name;
      a.textContent += `(${e.symbol})`;
      a.textContent += "  ";
      a.textContent += `(${logos.percent[i]}%)`;
      li.appendChild(img);
      li.appendChild(a);
      this.resultList.appendChild(li);
      i++;
    }
  });
  this.isPrev = true;
}

}