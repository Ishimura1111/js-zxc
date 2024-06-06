const apiURL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

async function fetchExchangeRates() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging line
        return data;
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        return [];
    }
}

function displayExchangeRates(rates) {
    // Сортування валют за назвою в алфавітному порядку
    rates.sort((a, b) => a.cc.localeCompare(b.cc));

    const tableBody = document.querySelector("#exchange-rates tbody");
    tableBody.innerHTML = ""; // Очистити існуючі рядки

    rates.forEach(rate => {
        const row = document.createElement("tr");

        const currencyCell = document.createElement("td");
        currencyCell.textContent = rate.cc;
        row.appendChild(currencyCell);

        const rateCell = document.createElement("td");
        rateCell.textContent = rate.rate.toFixed(2);
        row.appendChild(rateCell);

        tableBody.appendChild(row);
    });
}


async function updateExchangeRates() {
    const rates = await fetchExchangeRates();
    displayExchangeRates(rates);
}

// Initial load
updateExchangeRates();

// Update every 60 seconds
setInterval(updateExchangeRates, 60000);
