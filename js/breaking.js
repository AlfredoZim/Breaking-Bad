let charList = [];
let dataList = [];
let Phrases = [];
let allQuotes = [];
let id_char;
const select = document.getElementById("select");
const search = document.getElementById("search");
const data = document.getElementById("data");
const phrasesHTML = document.getElementById("phrases");
const url = "https://breakingbadapi.com/api/characters/";
let info = [];

function showList() {
  fetch(url)
    .then((response) => response.json())
    .then((list) => {
      charList = list;
      renderList();
    });
}
function renderList() {
  const optionsRender = charList
    .map((char) => {
      return `<option value=${char.char_id}>${char.name}</option>`;
    })
    .join("");
  select.innerHTML += optionsRender;
}
//___________________________________________________________________
function showChar() {
  if (select.value != 0) {
    fetch(`${url}${select.value}`)
      .then((response) => response.json())
      .then((list) => {
        dataList = list;
        renderChar();
      });
  }
}
function renderChar() {
  info = dataList[0];
  let occupation = "";
  for (const ocu of info.occupation) {
    occupation += `${ocu}<br><br>`;
  }

  let charRender = `<div class="row text-center nick">
      <div class="car">
        <img class="h-100 " src="./img/van.png">
      </div>
      <h2>"- ${info.nickname}"</h2>
    </div>
    <div class="row names">
      <div class="col-12 col-md-6 text-center mt-3">
        <h3 class='mt-2'>Name: ${info.name}</h3>
        <h3 class='mt-2'>Actor: ${info.portrayed}</h3>
        <p class='fs-4 mt-4'>Occupation:</p>
        <p class='fs-6'>${occupation}</p>
      </div>
      <div class="col-12 col-md-4">
        <img class="w-100 img-thumbnail" src="${info.img}">
      </div>
    </div>`;
  data.innerHTML = charRender;
  showPhrase();
}

function showPhrase() {
  fetch("https://breakingbadapi.com/api/quotes")
    .then((response) => response.json())
    .then((quotes) => {
      allQuotes = quotes;
      renderQuotes();
    });
}
function renderQuotes() {
  quoteStruc = "<h4>Some quotes:</h4>";
  let render = allQuotes.filter((quote) => quote.author.includes(info.name))
    ? allQuotes.filter((quote) => quote.author.includes(info.name))
    : "";
  if (render != "") {
    for (const quo of render) {
      quoteStruc += `<p>"${quo.quote}"</p><hr>`;
    }
    phrasesHTML.innerHTML = quoteStruc;
  }
}

//___________________________________________________________________
showList();
search.onclick = showChar;
