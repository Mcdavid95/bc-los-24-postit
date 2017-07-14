
# bc-los-24-postit
# POSTIT
[![Build Status](https://travis-ci.org/Mcdavid95/bc-los-24-postit.svg?branch=server)](https://travis-ci.org/Mcdavid95/bc-los-24-postit)

[link on heroku](https://postit-dyno.herokuapp.com/)

## Description
PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.
##  Features
* User Registration and Login pages
* User should create new groups
* User should add already registered users to groups
* User should send message to specific group
* Send messages based on priority
        - Normal: in-app notifications
        - Urgent: in-app and email notifications.
        - Critical: in-app, email and SMS notifications.
* Reset passsword

## Usage
* Test on postman using the /api/...suffix

## Tecnologies Used
* JavaScript(Node)
* HTML and CSS - Front-end Display
* PostGresql - for data persistency

## Dependencies
* Express
* Sequelize
* React
* Babel

