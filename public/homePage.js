

const logoutBtn = new LogoutButton()
logoutBtn.action = (() => ApiConnector.logout((response) => {
    if (response.success) {
        location.reload()
    }
}))

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
})

const ratestBoard = new RatesBoard()
const getRates = () => {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratestBoard.clearTable()
            ratestBoard.fillTable(response.data)
        }
    })
}

getRates();

const moneyManager = new MoneyManager()
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, () => {
        if (response.success) {
            ProfileWidget.showProfile((response.balance))
            moneyManager.setMessage('', 'Баланс пополнен')
        } else {
            moneyManager.setMessage('', 'Ошибка')
        }
    })
}








// const val = $.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(data) {
// $('#usd').html(data.Valute.USD.Nominal+" Доллар -> "+ data.Valute.USD.Value+" Рублей");
// 	});
