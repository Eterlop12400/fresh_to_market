class Cart {
    n = 0;
    constructor() {
        this.loadCart();
        this.attachEventHandlers();
    }

    attachEventHandlers() {
        const modal = $("#eventModal");
        let modalTitle = document.querySelector(".modal-title");
        let modalMessage = document.querySelector(".modal-message");
        let shoppingCartNum = document.querySelector("#shopping-cart-number");
        let shoppingCartButton = document.querySelector(".shopping-cart-button");

        /*
        This method will check the number of items in the cart, if the cart is empty it will make a modal pop up with
        an error for the user. If the cart is at least 1 item it will clear the cart and let the user they have checked
        out successfully.
        */
        shoppingCartButton.addEventListener("click", () => {
            if (this.n === 0) {
                modalTitle.innerText = "Oops!";
                modalMessage.innerText = "Your cart is currently empty! Add some items and try again!";

                this.showModal(modal)
            } else {
                this.n = 0;

                const cartItems = {
                    items: this.n
                };
                localStorage.setItem("cartItems", JSON.stringify(cartItems));

                shoppingCartNum.innerText = this.n;
                modalTitle.innerText = "Success!";
                modalMessage.innerText = "You have checked out successfully!";

                this.showModal(modal);
            }
        });
    }

    loadCart() {
        if (localStorage.getItem('cartItems')) {
            let shoppingCartNum = document.querySelector("#shopping-cart-number");
            const parsedData = JSON.parse(localStorage.getItem('cartItems'));

            this.n = parsedData.items;

            shoppingCartNum.innerText = parsedData.items;
        }
    }

    /**
     * This method takes in a modal elm selector and will display the modal when called.
     *
     * @param elm
     */
    showModal(elm) {
        elm.modal("show");
    }
}

// When the page finishes loading this will instantiate our Application class which will then run the constructor.
window.addEventListener("load", function() {
    let app = new Cart();
});