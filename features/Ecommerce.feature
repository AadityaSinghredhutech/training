Feature: Ecommerce validations

  Scenario: Placing the Order
    Given a login to Ecommerce application with "hanuchizuru@gmail.com" and "Hanusingh89@"
    When Add "ADIDAS ORIGINAL" to Cart
    Then Verify "ADIDAS ORIGINAL" is displayed in the Cart
    When Enter valid details and Place the Order
    