
'use strict'

const userform = new UserForm();

userform.loginFormCallback = (data => {           //авторизация
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userform.setLoginErrorMessage(`Пользователь с логином ${data.login} и указанным паролем не найден`)
        }
    })
})
userform.registerFormCallback = (data => {        //регистрация
    ApiConnector.register(data, response => {     
        if (response.success) {
            location.reload();
        } else {
            userform.setRegisterErrorMessage(`Проверьте введенные данные`)
        }
    })
})








