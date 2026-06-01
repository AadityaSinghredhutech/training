Feature: New Ecommerce Validation

Scenario: Placing the Order
    Given a login to Ecommerce application with "hanuchizuru@gmail.com" and "Hanusingh89@" 
    When Add "ADIDAS ORIGINAL" to Cart
    Then Check if "ADIDAS ORIGINAL" is in cart or not
    When User completes payment and submits order
