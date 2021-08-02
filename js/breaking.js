let charList = [];
let dataList = [];
let Phrases = [];
let id_char;
const select = document.getElementById("select");
const search = document.getElementById("search");
const data = document.getElementById("data");
const url = "https://breakingbadapi.com/api/characters/";

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
  fetch(`${url}${select.value}`)
    .then((response) => response.json())
    .then((list) => {
      dataList = list;
      console.log(dataList);
      renderChar();
    });
}
function renderChar() {
    const info = dataList[0];

  let charRender = 
  `<div class="row text-center nick">
      <div class="car">
        <img class="h-100 " src="./img/van.png">
      </div>
      <h2>"${info.nickname}"</h2>
    </div>
    <div class="row names">
      <div class="col-12 col-md-6 text-center mt-5">
        <h3 class='mt-3'>Name: ${info.name}</h3>
        <h3 class='mt-3'>Actor: ${info.portrayed}</h3>
        <p class='fs-4 mt-5'>Occupation:</p>
        <p class='fs-5'>${info.occupation[0]}</p>
      </div>
      <div class="col-12 col-md-4">
        <img class="w-100 img-thumbnail" src="${info.img}">
      </div>
    </div>`;
  data.innerHTML = charRender;
}

//___________________________________________________________________
showList();
search.onclick = showChar;
