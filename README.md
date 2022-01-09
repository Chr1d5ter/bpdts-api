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

## The Answer

```
  {
    "header": { "code": 200, "message": "ok", "numResults": 9 },
    "data": [
      {
        "id": 135,
        "first_name": "Mechelle",
        "last_name": "Boam",
        "email": "mboam3q@thetimes.co.uk",
        "ip_address": "113.71.242.187",
        "latitude": -6.5115909,
        "longitude": 105.652983
      },
      {
        "id": 266,
        "first_name": "Ancell",
        "last_name": "Garnsworthy",
        "email": "agarnsworthy7d@seattletimes.com",
        "ip_address": "67.4.69.137",
        "latitude": 51.6553959,
        "longitude": 0.0572553
      },
      {
        "id": 322,
        "first_name": "Hugo",
        "last_name": "Lynd",
        "email": "hlynd8x@merriam-webster.com",
        "ip_address": "109.0.153.166",
        "latitude": 51.6710832,
        "longitude": 0.8078532
      },
      {
        "id": 396,
        "first_name": "Terry",
        "last_name": "Stowgill",
        "email": "tstowgillaz@webeden.co.uk",
        "ip_address": "143.190.50.240",
        "latitude": -6.7098551,
        "longitude": 111.3479498
      },
      {
        "id": 520,
        "first_name": "Andrew",
        "last_name": "Seabrocke",
        "email": "aseabrockeef@indiegogo.com",
        "ip_address": "28.146.197.176",
        "latitude": "27.69417",
        "longitude": "109.73583"
      },
      {
        "id": 554,
        "first_name": "Phyllys",
        "last_name": "Hebbs",
        "email": "phebbsfd@umn.edu",
        "ip_address": "100.89.186.13",
        "latitude": 51.5489435,
        "longitude": 0.3860497
      },
      {
        "id": 658,
        "first_name": "Stephen",
        "last_name": "Mapstone",
        "email": "smapstonei9@bandcamp.com",
        "ip_address": "187.79.141.124",
        "latitude": -8.1844859,
        "longitude": 113.6680747
      },
      {
        "id": 688,
        "first_name": "Tiffi",
        "last_name": "Colbertson",
        "email": "tcolbertsonj3@vimeo.com",
        "ip_address": "141.49.93.0",
        "latitude": 37.13,
        "longitude": -84.08
      },
      {
        "id": 794,
        "first_name": "Katee",
        "last_name": "Gopsall",
        "email": "kgopsallm1@cam.ac.uk",
        "ip_address": "203.138.133.164",
        "latitude": 5.7204203,
        "longitude": 10.901604
      }
    ]
  }
```
