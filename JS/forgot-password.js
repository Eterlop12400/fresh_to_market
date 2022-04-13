class Program {
    constructor() {
        this.attachEventHandlers();
    }

    // Since we are doing this lookup repeatedly and may add more code that needs to also do the lookup, I decided to make it a getter.
    get _emailInput () {
        return document.querySelector(".email");
    }

    /**
     * This method takes in a modal elm selector and will display the modal when called.
     *
     * @param elm
     */
    showModal(elm) {
        elm.modal("show");
    }

    attachEventHandlers() {
        const sendButton = document.querySelector(".sendButton");

        sendButton.addEventListener("click", this.checkForm.bind(this));
    }

    /*
    This method will take form inputs and use the utility class validation to ensure inputs are valid. If the inputs are
    valid then it will display a modal for success. Otherwise it will mark the inputs as invalid and will display and error modal.
    */
    checkForm() {
        // Setting up variables
        const modal = $("#eventModal");
        let modalTitle = document.querySelector(".modal-title");
        let modalMessage = document.querySelector(".modal-message");

        let emailInputValue = this._emailInput.value;
        const emailInput = this._emailInput;


        // Calling our utility class to validate input.
        emailInputValue = Utility.emailValidation(emailInputValue);


        // If an input is invalid it will be marked as such, otherwise it will be marked as valid.
        let markInputForPassOrFail = (inputValue, input) => {
            if (inputValue === false) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        }

        markInputForPassOrFail(emailInputValue, emailInput);

        /*
        If any of the inputs fail validation it will change the modal to show and error message. Otherwise it will
        bring you to the login page.
        */
        if (emailInputValue === false) {
            modalTitle.innerText = "Oops!";
            modalMessage.innerText = "Invalid Input(s), Please Try Again!";

            this.showModal(modal)
        } else {
            modalTitle.innerText = "Email Sent!";
            modalMessage.innerText = "Please check your email to reset your password! You will be redirected back to the login screen in a moment!";

            this.showModal(modal)

            setTimeout(() => {
                window.location = "login.html";
            }, 5000);
        }
    }

}

// When the page finishes loading this will instantiate our Application class which will then run the constructor.
window.addEventListener("load", function() {
    let app = new Program();
});