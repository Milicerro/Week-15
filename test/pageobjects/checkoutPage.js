class CheckoutPage {

    get title() {
        return $("#header_container > div.header_secondary_container > span");
    }

    get checkBtn() {
        return $("#checkout");
    }

    get cancelBtn() {
        return $("#cancel");
    }

    get continueBtn() {
        return $("#continue");
    }

    get finishBtn() {
        return $("#finish");
    }

    get goBackBtn() {
        return $("#back-to-products");
    }

    get firstNameInput() {
        return $("#first-name");
    }

    get lastNameInput() {
        return $("#last-name");
    }

    get zipCodeInput() {
        return $("#postal-code");
    }

    get errorMsg() {
        return $("#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error");
    }

    get paymentInfo() {
        return $("#checkout_summary_container > div > div.summary_info > div:nth-child(1)");
    }

    get elementDescr() {
        return $("#checkout_summary_container > div > div.cart_list > div.cart_item");
    }
    get total() {
        return $("#checkout_summary_container > div > div.summary_info > div.summary_info_label.summary_total_label");
    }
}

export default new CheckoutPage();