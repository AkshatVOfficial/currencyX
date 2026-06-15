const selects = document.querySelectorAll("select");
const from = document.getElementById("from");
const to = document.getElementById("to");
const fromConvert = document.querySelector(".converted-from");
const toConvert = document.querySelector(".converted-to");
const msg = document.querySelector(".msg");
const btn = document.querySelector("button");

const themeBtn = document.querySelector(".fa-circle-half-stroke");
const change = document.querySelector(".fa-arrow-right-arrow-left");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

for (let select of selects) {
  for (let code in countryList) {
    let countryCode = countryList[code];
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    select.append(newOption);
    if (select.name === "from-option" && newOption.value === "USD") {
      newOption.selected = true;
    } else if (select.name === "to-option" && newOption.value === "INR") {
      newOption.selected = true;
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// to update flag

function updateFlag(element) {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let img = element.parentElement.querySelector("img");

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  img.src = newSrc;
}

// to update currency

btn.addEventListener("click", updateCurrency);

async function updateCurrency() {
  let fromCurrency = from.value;
  let toCurrency = to.value;
  let URL = `https://api.frankfurter.dev/v1/latest?base=${fromCurrency}&symbols=${toCurrency}`;
  console.log(URL);
  let res = await fetch(URL);
  let data = await res.json();
  let value = await data.rates;
  let final = await value[toCurrency];
  console.log(data);
  console.log(final);
  toConvert.value = fromConvert.value * final;
  console.log(msg);
  msg.innerText = `1 ${fromCurrency} = ${final} ${toCurrency}`;
}

const switchCurr = () => {
  let fromCurrency = from.value;
  from.value = to.value;
  to.value = fromCurrency;

  updateFlag(from);
  updateFlag(to);
};

change.addEventListener("click", switchCurr);
