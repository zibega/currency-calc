const currencyTable = document.getElementById('currency-table');
const tbody = currencyTable.querySelector('tbody');
function addCurrencyRow(currency, rate) {
    const row = document.createElement('tr');
    const currencyCell = document.createElement('td');
    const rateCell = document.createElement('td');
    currencyCell.textContent = currency;
    rateCell.textContent = rate;
    row.appendChild(currencyCell);
    row.appendChild(rateCell);
    tbody.appendChild(row);
}

const apiUrl = 'https://api.nbrb.by/exrates/currencies';


async function fetchCurrencyData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();


        const currencies = data.Cur_OfficialRate;


        for (const currency in currencies) {
            addCurrencyRow(currency, currencies[currency]);
        }
    } catch (error) {
        console.error('Ошибка при получении данных о валютах:', error);
    }
}


fetchCurrencyData();