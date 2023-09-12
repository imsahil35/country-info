let getBtn = document.getElementById("get-btn");
let countryinput = document.getElementById("country-name");
let info = document.getElementById("information");

getBtn.addEventListener("click", ()=>{
    if(countryinput.value==""){
        alert("Country name should not be Empty");
    }
    let countryName = countryinput.value;
    let apiURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    fetch(apiURL)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        info.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img"/>
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currencies:</h4>
                <span>${Object.keys(data[0].currencies)[0]}</span>
                <span>${data[0].currencies[Object.keys(data[0].currencies)].name}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages).join(", ")}</span>
            </div>
        </div>
        `
    })
    .catch((error) => {
        console.error("Error:", error.message);
        info.innerHTML = "<p>An error occurred while fetching data.</p>";
    });
});