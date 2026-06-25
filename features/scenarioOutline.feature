Feature: Login Functionality

Scenario Outline: Login with multiple users

Given user is on SauceDemo login page
When user enters "<username>" and "<password>"
And user clicks on login button

Examples:
    | username                 | password     | 
    | standard_user            | secret_sauce | 
    | problem_user             | secret_sauce |
    | performance_glitch_user  | secret_sauce |
    | locked_out_user          | secret_sauce |
