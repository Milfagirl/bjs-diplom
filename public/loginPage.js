
'use strict'

const userform = new UserForm();

userform.loginFormCallback = (data => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userform.loginErrorMessageBox = response.data
            console.log(userform.loginErrorMessageBox)
        }
    })
})
userform.registerFormCallback = (data => {
    ApiConnector.register(data, response => {     
        if (response.success) {
            location.reload();
        } else {
            userform.loginErrorMessageBox = response.data
            console.log(userform.loginErrorMessageBox)
        }
    })
})








