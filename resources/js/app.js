
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('bootstrap');
// require('jquery');

window.Vue = require('vue');
window.axios = require('axios');
        
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data() {
        return {
            webPath: webPath,
            cart: [],
            cart_checkout: [],
            addToCartNotFlag: false,
            currency: "TZS",
            notificationMsg: "Item added into cart.",
            tigoMinLimit: 1000,
            product_quantity: 1,
            bankDetailInfoBox: false,
            toggleBankDetailBox: false,
            toggleCODBox: false,
            toggleBAFSAVINGBox: false,
            allCartItemOptionSelected: false,
            selectedCartItems: [],
            btnDisabled: true,
            regions: {}
        }
    },
    mounted() {
        this.loadToCart();
    },
    computed: {
    	subtotal() {
    		var amount = 0;
    		var currency = '';

            this.cart_checkout.forEach(function(item, key) {
                currency = item.currency;
                amount += Number(item.price) * Number(item.quantity);
            });

    		return currency +' '+ Math.round(amount);
    	},
    	tax() {
    		return 0;
    	},
    	total() {
    		var amount = 0;
    		var currency = '';

            this.cart_checkout.forEach(function(item, key) {
                currency = item.currency;
                amount += Number(item.price) * Number(item.quantity);
            });

    		return currency +' '+ Math.round((amount + this.tax));
    	},
        totalAmount() {
            var amount = 0;

            this.cart_checkout.forEach(function(item, key) {
                currency = item.currency;
                amount += Number(item.price) * Number(item.quantity);
            });

            return amount;
        }
    },
    methods: {
        renderRegions(city) {
            console.log(city);
            axios.get(webPath + 'cart/get_regions/'+city)
                .then((response) => {
                    this.regions = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        pushSelectedToCheckoutCart(item, elem) {
            if (elem.event.target.checked) {
                this.cart_checkout.push(item);
            } else {
                this.cart_checkout.pop(item);
            }

            if (this.cart.length == this.cart_checkout.length) {
                this.allCartItemOptionSelected = true;
            } else {
                this.allCartItemOptionSelected = false;
            }
        },
        checkAllCartItems() {
            this.selectedCartItems = [];
            this.cart_checkout = [];
            this.btnDisabled = true;
            if (!this.allCartItemOptionSelected) {
                this.cart.forEach((item) => {
                    this.selectedCartItems.push(item.id);
                    this.cart_checkout.push(item);
                });
                this.btnDisabled = false;
            }
        },
        toggleBankDetailBox() {
            this.bankDetailInfoBox = !this.bankDetailInfoBox;
        },
        productDetail(slug) {
          return webPath + 'product/detail/' + slug;
        },
        productImage(image) {
            return webPath + 'assets/uploads/product/thumbnail/' + image;
        },
        loadToCart() {
        	axios.get(webPath + 'cart/load')
            .then((response) => {
                if (currentPage == 'checkout') {
                    if (response.data.data.cart_checkout != undefined) {
                        this.cart_checkout = response.data.data.cart_checkout;
                    }
                }
                if (response.data.data.cart != undefined) {
                    this.cart = response.data.data.cart;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        containsObject(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i].id == obj.id) {
                    return true;
                }
            }
            return false;
        },
        addToCart(product, redirectToCheckout) {
        	product['quantity'] = this.product_quantity;
            if (this.containsObject(product, this.cart) == false) {
                var price = Math.round(Number(product.price));
                product.price = price;
                this.cart.push(product);
                $.post(webPath + 'cart/add', {
                    "cart": this.cart
                }, (response) => {
                    this.notificationMsg = response.message;
                    this.addToCartNotFlag = true;
                    setTimeout(() => {
                        this.addToCartNotFlag = false;
                        if (redirectToCheckout == 'redirectToCheckout') {
                            alert(1);
                            window.location.href = webPath + 'cart/checkout';
                        }
                    }, 2000);
                });
            } else {
                this.notificationMsg = "Already added";
                this.addToCartNotFlag = true;
                setTimeout(() => {
                    this.addToCartNotFlag = false;
                    if (redirectToCheckout == 'redirectToCheckout') {
                        window.location.href = webPath + 'cart/checkout';
                    }
                }, 2000);
            }
        },
        removeFromCart(product) {
            this.cart.splice(this.cart.findIndex(v => v.id === product.id), 1);
            $.post(webPath + 'cart/add', {
            	"cart": this.cart
            }, (response) => {
            	console.log(response);
            });
        },
        cartCheckout() {
            if (this.totalAmount <= 0) return;
            var _cart = [];
            var _cart_checkout = [];
            if (this.selectedCartItems.length > 0) {
                this.cart.forEach( (item) => {
                    if(this.selectedCartItems.indexOf(item.id) != -1) {
                        _cart_checkout.push(item);
                    } else {
                        _cart.push(item);
                    }
                });

            }

            if (_cart_checkout.length > 0) {
                $.post(webPath + 'cart/add', {
                    "cart": _cart,
                    "cart_checkout": _cart_checkout,
                }, (response) => {
                    console.log(response);
                    window.location.href = webPath + 'cart/checkout';
                });
            }
        },
        cartItemQuantityIncrement(item) {
            var quantity = Number(item.quantity) + 1;
            if (quantity.toString().length <= 9) {
                item.quantity = quantity;
            }
        },
        cartItemQuantityDecrement(item) {
            var quantity = Number(item.quantity);
            quantity = quantity - 1;
            item.quantity = (quantity < 1) ? 1 : quantity;
        },
        addToWishList(product_id) {
            $.post(webPath + 'wishlist/add', {
                "product_id": product_id
            }, (response) => {
                this.notificationMsg = response.message;
                this.addToCartNotFlag = true;
                setTimeout(() => {
                    this.addToCartNotFlag = false;
                }, 2000);
                console.log(response);
            });
        },
        onlyNumber($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
                $event.preventDefault();
            }
        },
        incrementValue() {
            var quantity = Number(this.product_quantity) + 1;
            if (quantity.toString().length <= 9) {
                this.product_quantity = quantity;
            }
        },
        decrementValue() {
            var quantity = Number(this.product_quantity);
            quantity = quantity - 1;
            this.product_quantity = (quantity < 1) ? 1 : quantity;
        }
    }
});
