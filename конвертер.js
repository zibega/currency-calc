let exchange = [];
let elem = document.getElementById('buttoncon');
elem.onclick = function () {
    let curr = document.getElementById('curr-select').value;
    if (!curr) {
        alert('Выберите валюту!');
        return;
    }
    let amount = document.getElementById('amount').value;
    if (!amount) {
        alert('Введите сумму!');
        return;
    }
    let curr2 = document.getElementById('curr-select2').value;
    if (!curr2) {
        alert('Выберите валюту!');
        return;
    }
    let rate1 = exchange.filter(obj => {
        return obj.Cur_Abbreviation === curr
    });
    let rate2 = exchange.filter(obj => {
        return obj.Cur_Abbreviation === curr2
    });
    let result = (rate1[0].Cur_OfficialRate * amount / rate1[0].Cur_Scale / (rate2[0].Cur_OfficialRate / rate2[0].Cur_Scale)).toFixed(2);
    document.getElementById('amountnew').value = result;
    console.log(curr, curr2, amount, rate1, rate2);
}
let url = 'https://api.nbrb.by/exrates/rates?parammode=2&periodicity=0';
(async () => {
    let response = await fetch(url);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        exchange = await response.json();
        exchange.push({ Cur_Abbreviation: 'BYN', Cur_Scale: 1, Cur_OfficialRate: 1, Cur_Name: 'Белорусский рубль' });
        let select = document.getElementById('curr-select');
        let select2 = document.getElementById('curr-select2');
        for (let i = 0; i < exchange.length; i++) {
            let opt = document.createElement('option');
            opt.value = exchange[i].Cur_Abbreviation;
            opt.innerText = exchange[i].Cur_Abbreviation + ' | ' + exchange[i].Cur_Name;
            select.appendChild(opt);
            let opt2 = document.createElement('option');
            opt2.value = exchange[i].Cur_Abbreviation;
            opt2.innerText = exchange[i].Cur_Abbreviation + ' | ' + exchange[i].Cur_Name;
            select2.appendChild(opt2);
        }
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
})()
document.getElementById('buttonlist').onclick = function () {
    window.location.href = 'валюты.html'
}