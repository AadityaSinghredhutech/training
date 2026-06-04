Feature: Order Checkout

Background: 
Given the user is logged in

Scenario:Placing the Order
Given The product named "ADIDAS ORIGINAL" will be added to cart
When The user will open the cart page and click on checkout
Then The user will select the country and place the order

