Feature: Login

Scenario: Valid Login
   Given user is on login page
   When user logs in with valid credentials "hanuchizuru@gmail.com" and "Hanusingh89@@@@" 
   Then dashboard should be displayed