// When html is ready (drawn)
$(document).ready(function () {
    // take the variable markup element with id jq-notification for notification от ajax
    var successMessage = $("#jq-notification");

    // Catch the click event on the 'add to cart' button
    $(document).on("click", ".add-to-cart", function (e) {
        // Block his base action
        e.preventDefault();

        // Take the counter element in the cart icon and take the value from there
        var goodsInCartCount = $("#goods-in-cart-count");
        var cartCount = parseInt(goodsInCartCount.text() || 0);

        // Get items id from attribute data-product-id
        var product_id = $(this).data("product-id");

        //From attribute href take a link to the controller django
        var add_to_cart_url = $(this).attr("href");

        // create post query via ajax without reloading the page
        $.ajax({
            type: "POST",
            url: add_to_cart_url,
            data: {
                product_id: product_id,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                // Message
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                // After 7 sec close message
                setTimeout(function () {
                    successMessage.fadeOut(400);
                }, 7000);

                // Increasing the number of items in the cart (drawing in the template)
                cartCount++;
                goodsInCartCount.text(cartCount);

                // Change the contents of the cart to the response from django (new rendered fragment of cart markup)
                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);

            },

            error: function (data) {
                console.log("Error when adding item to cart");
            },
        });
    });




    // Catch the click event on the 'remove item from cart'
    $(document).on("click", ".remove-from-cart", function (e) {
        // Block his base action
        e.preventDefault();

        // Take the counter element in the cart icon and take the value from there
        var goodsInCartCount = $("#goods-in-cart-count");
        var cartCount = parseInt(goodsInCartCount.text() || 0);

        // ПGet items id from attribute data-cart-id
        var cart_id = $(this).data("cart-id");
        // From attribute href take a link to the controller django
        var remove_from_cart = $(this).attr("href");

        // create post query via ajax without reloading the page
        $.ajax({

            type: "POST",
            url: remove_from_cart,
            data: {
                cart_id: cart_id,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                // Message
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                // After 7 sec close message
                setTimeout(function () {
                    successMessage.fadeOut(400);
                }, 7000);

                // Increasing the number of items in the cart (drawing in the template)
                cartCount -= data.quantity_deleted;
                goodsInCartCount.text(cartCount);

                // Change the contents of the cart to the response from django (new rendered fragment of cart markup)
                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);

            },

            error: function (data) {
                console.log("Error when adding item to cart");
            },
        });
    });




    //  + - quantity of goods
    // Event handler for decrementing value
    $(document).on("click", ".decrement", function () {
        // Take a link to the controller django from attribute data-cart-change-url
        var url = $(this).data("cart-change-url");
        // Take cart's id from attribute data-cart-id
        var cartID = $(this).data("cart-id");
        // Looking for the nearest input with quantity 
        var $input = $(this).closest('.input-group').find('.number');
        // Take value items quantity
        var currentValue = parseInt($input.val());
        // If quantity more than one, than do -1
        if (currentValue > 1) {
            $input.val(currentValue - 1);
            // Run the function defined below
            // with arguments (card's id, new quantity, quantity decreased or increased, url)
            updateCart(cartID, currentValue - 1, -1, url);
        }
    });

    // Event handler for increasing value
    $(document).on("click", ".increment", function () {
        // Take a link to the controller django from attribute data-cart-change-url
        var url = $(this).data("cart-change-url");
        // Take cart's id from attribute data-cart-id
        var cartID = $(this).data("cart-id");
        // Search the nearest input with quantity
        var $input = $(this).closest('.input-group').find('.number');
        // Take value items quantity
        var currentValue = parseInt($input.val());

        $input.val(currentValue + 1);

        // Run the function defined below
        // with arguments (card's id, new quantity, quantity decreased or increased, url)
        updateCart(cartID, currentValue + 1, 1, url);
    });

    function updateCart(cartID, quantity, change, url) {
        $.ajax({
            type: "POST",
            url: url,
            data: {
                cart_id: cartID,
                quantity: quantity,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },

            success: function (data) {
                // Message
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                // After 7 sec close message
                setTimeout(function () {
                    successMessage.fadeOut(400);
                }, 7000);

                // Change the number of items in the cart
                var goodsInCartCount = $("#goods-in-cart-count");
                var cartCount = parseInt(goodsInCartCount.text() || 0);
                cartCount += change;
                goodsInCartCount.text(cartCount);

                // Change the contents of the cart
                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);

            },
            error: function (data) {
                console.log("Error when adding item to cart");
            },
        });
    }

    // Take from templates element's id - message from django
    var notification = $('#notification');
    // Close after 7 sec
    if (notification.length > 0) {
        setTimeout(function () {
            notification.alert('close');
        }, 7000);
    }

    // When clock on the cart icon, a pop-up (modal) window opens
    $('#modalButton').click(function () {
        $('#exampleModal').appendTo('body');

        $('#exampleModal').modal('show');
    });

    // Event click on the close button of the cart window
    $('#exampleModal .btn-close').click(function () {
        $('#exampleModal').modal('hide');
    });

    // Event handler for radio button selecting delivery method
    $("input[name='requires_delivery']").change(function () {
        var selectedValue = $(this).val();
        // Hide or display input delivery address
        if (selectedValue === "1") {
            $("#deliveryAddressField").show();
        } else {
            $("#deliveryAddressField").hide();
        }
    });
});