Feature: Actions

Scenario: Hover over user profile
 Given I navigate to the hover page
 When I hover over user 1
 Then the profile link should become visible

Scenario: Right click on context menu
 Given I navigate to the context menu page
 When I right click on the box
 Then I should see the context menu alert

Scenario: Select value from dropdown
 Given I navigate to the dropdown page
 When I select option from dropdown
 Then option should be selected

Scenario: Select country from autocomplete
 Given I navigate to the autocomplete page
 When I type country name
 And I select India from suggestion
 Then India should be selected   