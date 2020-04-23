
'use strict'

const userform = new UserForm();

userform.loginFormCallback = (data => {           //авторизация
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userform.setLoginErrorMessage(response.data)
        }
    })
})
userform.registerFormCallback = (data => {        //регистрация
    ApiConnector.register(data, response => {     
        if (response.success) {
            location.reload();
        } else {
            userform.setRegisterErrorMessage(response.data)
        }
    })
})








