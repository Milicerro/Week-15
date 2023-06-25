class LogIn {

    get loginLogo() {
        return $("#root > div > div.login_logo");
    }

    get userNameInput() {
        return $("#user-name");
    }

    get passwordInput() {
        return $("#password");
    }

    get btnLogin() {
        return $("#login-button");
    }

    get errorMessage() {
        return $("#login_button_container > div > form > div.error-message-container.error > h3");
    }

    async login(userName, password) {
        await this.userNameInput.setValue(userName);
        await this.passwordInput.addValue(password);
    }

    async btnLoginClick() {
        await this.btnLogin.click();
    }
}

export default new LogIn();