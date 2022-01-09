# Chris Wilson Code Test

## Environment

Developed and tested against: -

- node.js **v14.16.0**
- npm **v7.19.1**

---

## Assumptions

List of assumptions made

- Our API only needs to return users for a named location and a certain distance around that location... e.g. All users that have a city of London or there GPS coordinates are within 50 miles of the centre of London
- The centre of London has GPS coordinates of lat: 51.509865, long: -0.118092
- Precision for distance is to 1/10th ( 0.1 ) of a mile
- We do not need to expose any other functionality from the API

---

## Basic Usage

The usual steps are needed to run the application: -

- **npm install** to install dependencies
- **npm test** to run tests and generate coverage report
- **npm build** builds the application
- **npm run-script dev** starts the application in watch mode for development

---

## Further improvements

Given more time ( this week has been exceedingly busy ) so spare time has been minimal ='( I would have...

- Tested the express routes using Jest ( I would have had to separated app and server components to make that work ). This would have made sure the /users endpoint existed
- Mocked out the axios calls and returned test data to get better code coverage in the _getPeopleInOrAroundLocation_ function. I wouldn't like to test it whilst it makes calls to the live API ( hence the low code coverage )
