class Application {
    constructor() {
        this.attachEventHandlers();
    }

    // Since we are doing this lookup repeatedly and may add more code that needs to also do the lookup, I decided to make it a getter.
    get _nameInput () {
        return document.querySelector("#nameInput");
    }

    get _emailInput () {
        return document.querySelector("#emailInput");
    }

    get _phoneInput () {
        return document.querySelector("#phoneInput");
    }

    get _messageInput () {
        return document.querySelector("#messageInput");
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
        const submitButton = document.querySelector(".contactUsMessage");

        submitButton.addEventListener("click", this.checkForm.bind(this));
    }

    /*
    This method will take form inputs and use the utility class validation to ensure inputs are valid. If the inputs are
    valid then it will display a modal for success and the form will reset. Otherwise it will mark the inputs as invalid
     and will display and error modal.
     */
    checkForm() {
        // Setting up variables
        const form = document.querySelector(".contactUsForm");
        const modal = $("#eventModal");
        let modalTitle = document.querySelector(".modal-title");
        let modalMessage = document.querySelector(".modal-message");

        let nameInputValue = this._nameInput.value;
        let emailInputValue = this._emailInput.value;
        let phoneInputValue = this._phoneInput.value;
        let messageInputValue = this._messageInput.value;

        const nameInput = this._nameInput;
        const emailInput = this._emailInput;
        const phoneInput = this._phoneInput;
        const messageInput = this._messageInput;

        // Calling our utility class to validate input.
        nameInputValue = Utility.stringValidation(nameInputValue);
        emailInputValue = Utility.emailValidation(emailInputValue);
        phoneInputValue = Utility.phoneValidation(phoneInputValue);
        messageInputValue = Utility.stringValidation(messageInputValue);

        // If an input is invalid it will be marked as such, otherwise it will be marked as valid.
        let markInputForPassOrFail = (inputValue, input) => {
            if (inputValue === false) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        }

        let resetMark = (input) => {
                input.classList.remove('is-valid');
            }

        markInputForPassOrFail(nameInputValue, nameInput);
        markInputForPassOrFail(emailInputValue, emailInput);
        markInputForPassOrFail(phoneInputValue, phoneInput);
        markInputForPassOrFail(messageInputValue, messageInput);

        /*
        If any of the inputs fail validation it will change the modal to show and error message. Otherwise it will
        remove all .is valid classes, reset the form, and display a success modal.
        */
        if (nameInputValue === false || emailInputValue === false || phoneInputValue === false || messageInputValue === false) {
            modalTitle.innerText = "Oops!";
            modalMessage.innerText = "Invalid Input(s), Please Try Again!";

            this.showModal(modal)
        } else {
            resetMark(nameInput);
            resetMark(emailInput);
            resetMark(phoneInput);
            resetMark(messageInput);

            form.reset();

            modalTitle.innerText = "Success!";
            modalMessage.innerText = "Your Message has been sent Successfully!";

            this.showModal(modal);
        }
    }
}

// When the page finishes loading this will instantiate our Application class which will then run the constructor.
window.addEventListener("load", function() {
    let app = new Application();
});