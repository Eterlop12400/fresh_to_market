class Program {
    constructor() {
        this.attachEventHandlers();
    }

    // Since we are doing this lookup repeatedly and may add more code that needs to also do the lookup, I decided to make it a getter.
    get _nameInput () {
        return document.querySelector(".nameInput");
    }

    get _emailInput () {
        return document.querySelector(".emailInput");
    }

    get _passwordInput () {
        return document.querySelector(".passwordInput");
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
        const createAccountButton = document.querySelector(".createAccountButton");

        createAccountButton.addEventListener("click", this.checkForm.bind(this));
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

        let nameInputValue = this._nameInput.value;
        let emailInputValue = this._emailInput.value;
        let passwordInputValue = this._passwordInput.value;

        const nameInput = this._nameInput;
        const emailInput = this._emailInput;
        const passwordInput = this._passwordInput;


        // Calling our utility class to validate input.
        nameInputValue = Utility.stringValidation(nameInputValue);
        emailInputValue = Utility.emailValidation(emailInputValue);
        passwordInputValue = Utility.stringValidation(passwordInputValue);


        // If an input is invalid it will be marked as such, otherwise it will be marked as valid.
        let markInputForPassOrFail = (inputValue, input) => {
            if (inputValue === false) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        }

        markInputForPassOrFail(nameInputValue, nameInput);
        markInputForPassOrFail(emailInputValue, emailInput);
        markInputForPassOrFail(passwordInputValue, passwordInput);

        /*
        If any of the inputs fail validation it will change the modal to show and error message. Otherwise it will
        bring you to the shop page.
        */
        if (nameInputValue === false || passwordInputValue === false || emailInputValue === false) {
            modalTitle.innerText = "Oops!";
            modalMessage.innerText = "Invalid Input(s), Please Try Again!";

            this.showModal(modal)
        } else {
            modalTitle.innerText = "Account Created!";
            modalMessage.innerText = "Your account has been created successfully! You will be redirected back to the login screen in a moment!";

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