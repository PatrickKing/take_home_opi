# Take Home Coding Exercise

This is a take home exercise for you to demonstrate your skills and interests in coding using either Rails or React.
You will be given three days to complete the exercise, but please don't feel like have to spend more than 3 hours on it.
There are no tricks - we want this to be a straightforward test of being able to take data and display it to the user.
There's very little in the way of requirements, so experiment with it and try to have fun!

## Premise

Given a given set of sensor data, your task is to either:
- display that data in a format that is easy read, or 
- return the data in a format that easy for another system to consume

## Evaluation Criteria

The primary thing we are looking for is how well your code would work in our team environment. To that end, we are looking at:
- maintainability
- consistent style
- proper separation of concerns
- bug free
- easy to understand

## Tech Stack

- if using React: Create React App to make the skeleton (we use TypeScript, but this is optional for this exercise)
- if using Rails: Generate New App to make the skeleton
- a collection of JSON data will be provided
- whatever packages or gems you feel are appropriate

## Required Features

- displays the information in a format that is _easy-to-consume_ (you can choose if the audience are human, or another system)
- the components should work with the provided JSON format
  - if using React, treat the JSON as if it is provided by an API: put it in your app's "public" folder&mdash;or store it in a remote location such as [JSONkeeper](jsonkeeper.com)&mdash;and load it at runtime.
  - if using Rails, treat the JSON as if it is sample data for your database: put it in a seed file.
- numbers are formatted to one decimal place and specify the units
- provide a way for the user to toggle the temperature sensors between Celsius and Fahrenheit

## Optional Stretch Features

These features are optional - you do not have to implement all of them, but you are welcome to implement as many as you like.

- Able to specify which columns/attributes are shown and which are hidden
- Able to choose which columns/attributes the data is sorted by
- Able to specify the display timezone of the dates and times
- Able to filter the data
- Custom Styling
- Unit Testing
- Storybook Integration
- Swagger / OpenAPI Specification
- Any other enhancements or improvements that you can think of
