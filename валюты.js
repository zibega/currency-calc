const currencyTable = document.getElementById('currency-table');
const tbody = currencyTable.querySelector('tbody');

function addCurrencyRow(currency) {
    const row = document.createElement('tr');
    const currencyCell = document.createElement('td');
    const rateCell = document.createElement('td');
    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = currency.Cur_Abbreviation;
    checkbox.value = currency.Cur_Abbreviation;
    checkbox.onchange = function () {
        if (this.checked) {
            let row1 = this.parentElement.parentElement;
            tbody.prepend(row1);
        }
    }
    checkboxCell.appendChild(checkbox);
    currencyCell.textContent = currency.Cur_Name;
    rateCell.textContent = (currency.Cur_OfficialRate / currency.Cur_Scale).toFixed(4);
    row.appendChild(currencyCell);
    row.appendChild(rateCell);
    row.appendChild(checkboxCell);
    tbody.appendChild(row);
}

const apiUrl = 'https://api.nbrb.by/exrates/rates?parammode=2&periodicity=0';

async function fetchCurrencyData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        for (const currency of data) {
            addCurrencyRow(currency);
        }
    } catch (error) {
        console.error('Ошибка при получении данных о валютах:', error);
    }
}

fetchCurrencyData();
document.getElementById('buttonback').onclick = function () {
    window.location.href = 'конвертер.html'
}