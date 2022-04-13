class Application {
    n = 0;
    constructor() {
        this.loadCart();
        this.attachEventHandlers();
    }

    attachEventHandlers() {
        const modal = $("#eventModal");
        let shoppingCartButton = document.querySelector(".shopping-cart-button");
        let addToCartButton = document.querySelectorAll(".add-to-cart");
        let quantitySelect = document.querySelectorAll("select");
        let modalTitle = document.querySelector(".modal-title");
        let modalMessage = document.querySelector(".modal-message");
        let shoppingCartNum = document.querySelector("#shopping-cart-number");


        /*
        When a add to cart button is clicked it will change the text of the button to item added and will change the text
        back after 2 seconds, it will also check to see the quantity of items selected and will add the amount of items
        chosen to the cart.
         */
        for(let i = 0; i < addToCartButton.length; i++) {
            addToCartButton[i].addEventListener("click", (e) => {
                addToCartButton[i].innerText = "Item Added!";
                addToCartButton[i].disabled = true;
                this.n += parseFloat(quantitySelect[i].value);
                shoppingCartNum.innerText = this.n;

                setTimeout( () => {
                    addToCartButton[i].innerText = "Add To Cart";
                    addToCartButton[i].disabled = false;
                }, 2000);

                this.setLocalStorage();
            });
        }


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

                this.showModal(modal)
            }
        });
    }

    /**
     * This method takes in a modal elm selector and will display the modal when called.
     *
     * @param elm
     */
    showModal(elm) {
        elm.modal("show");
    }

    setLocalStorage() {
        const cartItems = {
            items: this.n
        };
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    loadCart() {
        if (localStorage.getItem('cartItems')) {
            let shoppingCartNum = document.querySelector("#shopping-cart-number");
            const parsedData = JSON.parse(localStorage.getItem('cartItems'));

            this.n = parsedData.items;

            shoppingCartNum.innerText = parsedData.items;
        }
    }

}

// When the page finishes loading this will instantiate our Application class which will then run the constructor.
window.addEventListener("load", function() {
    let app = new Application();
});