'use strict'


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

const ratestBoard = new RatesBoard()    //курсы валют
const getRates = () => {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratestBoard.clearTable()
            ratestBoard.fillTable(response.data)
        }
    })
}

// let intervalID = setInterval(getRates(), 60000)
setInterval(getRates(), 60000)

const moneyManager = new MoneyManager()                     //Пополнение баланса
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            moneyManager.setMessage(response.success, 'Операция выполнена, обновите страницу')
            ProfileWidget.showProfile(response.balance)
        } else {
            moneyManager.setMessage(response.success, response.data)
        }
    })
}

moneyManager.conversionMoneyCallback = (data) => {      //конвертация
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            moneyManager.setMessage(response.success, 'Операция выполнена, обновите страницу')   //не работает
            ProfileWidget.showProfile(response.balance)
        } else {
            moneyManager.setMessage(response.success, response.data)
        }
    })

}


const favoritesWidget = new FavoritesWidget()
ApiConnector.getFavorites((response) => {   //начальный список избранного
    if (response.success) {
        favoritesWidget.clearTable()
        favoritesWidget.fillTable(response.data)
        moneyManager.updateUsersList(response.data)
    }
})

favoritesWidget.addUserCallback = (data) => {    //добавление пользователя в список избранных: 
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable()
            favoritesWidget.fillTable(response.data)
            moneyManager.updateUsersList(response.data)
            moneyManager.setMessage(response.success, 'Операция выполнена, обновите страницу')
        } else {
            moneyManager.setMessage(response.success, response.data)
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {      //Удаление из избранных
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable()
            favoritesWidget.fillTable(response.data)
            moneyManager.updateUsersList(response.data)
            moneyManager.setMessage(response.success, 'Операция выполнена, обновите страницу')
        } else {
            moneyManager.setMessage(response.success, response.data)
        }
    })
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            moneyManager.setMessage(response.success, 'Операция выполнена, обновите страницу')
            ProfileWidget.showProfile(response.balance)
        } else {
            moneyManager.setMessage(response.success, response.data)
        }
    })
}


// const val = $.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(data) {
// $('#usd').html(data.Valute.USD.Nominal+" Доллар -> "+ data.Valute.USD.Value+" Рублей");
// 	});
