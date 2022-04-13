class SearchBar {
    constructor() {
        this.attachEventHandler();
    }

    attachEventHandler() {
        // Setting up our variables
        const modal = $("#eventModal");
        let modalTitle = document.querySelector(".modal-title");
        let modalMessage = document.querySelector(".modal-message");
        let searchInput = document.querySelector(".search-input");
        let searchButton = document.querySelector(".search-btn");
        let checkIfValid;

        /*
        Adding a click event for out search button that when clicked it will check to make sure it isn't left blank,
        if it is it will be flagged as invalid. Otherwise it will check a switch statement. If nothing from the statement
        matches the input it will display a message to the user through a modal.
        * */
        searchButton.addEventListener("click", (e) => {
            checkIfValid = Utility.stringValidation(searchInput.value);

            if(checkIfValid === false) {
                searchInput.classList.add("is-invalid");
            } else {
                searchInput.classList.remove("is-invalid");

                switch(searchInput.value.toLowerCase()) {
                    case "deals":
                        window.location = "view-all-deals.html";
                        break;
                    case "seasonal":
                        window.location = "view-all-seasonal.html";
                        break;
                    case "fruits":
                        window.location = "view-all-fruits.html";
                        break;
                    case "veggies":
                        window.location = "view-all-veggies.html";
                        break;
                    default:
                        modalTitle.innerText = "Oops!";
                        modalMessage.innerText = `We couldn't find "${searchInput.value}"! Please try again! Maybe typing in "deals" will make something come up!`;

                        searchInput.value = "";

                        this.showModal(modal);
                }
            }
        });
    }

    showModal(elm) {
        elm.modal("show");
    }
}

// When the page finishes loading this will instantiate our Application class which will then run the constructor.
window.addEventListener("load", function() {
    let app = new SearchBar();
});