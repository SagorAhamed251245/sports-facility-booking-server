# Sports Facility Booking Server

## Setup and Installation

- Clone the Repository

* git clone https://github.com/SagorAhamed251245/sports-facility-booking-server.git
* cd sports-facility-booking-server

## Install Dependencies

- Using npm:
  npm install

## Environment Variables

```env
- Create a .env file in the root directory and add the following variables:
NODE_ENV=development

PORT=3000

DATABASE_URL=mongodb://localhost:27017

BCRYPT_SALT_ROUNDS=10


JWT_ACCESS_SECRET=yourjwtaccesssecrettoken

JWT_REFRESH_SECRET=yourjwt_refresh_secret

JWT_ACCESS_EXPIRES_IN=1d

JWT_REFRESH_EXPIRES_IN=7d

```

## Start the Server

- Using npm:
  npm run start:dev

  The server will start on http://localhost:3000.

## API Endpoints

## Testing the Endpoints

### You can use tools like Postman or cURL to test the API endpoints.

#### Sample Endpoints:

###### User Routes

User Sign Up: POST /api/auth/signup
User Login: POST /api/auth/login

###### Facility Routes

Create a Facility (Admin Only) Route: POST /api/facility
Update a Facility (Admin Only) Route: PUT /api/facility/:id
Delete a Facility - Soft Delete (Admin Only) Route: DELETE /api/facility/:id
Get All Facilities Route: GET /api/facility

###### Booking Routes

Check Availability Check the availability of time slots for booking on a specific date. Route: GET /api/check-availability
Create a Booking (User Only) Route: POST /api/bookings
View All Bookings (Admin Only) Route: GET /api/bookings
View Bookings by User (User Only) Route: GET /api/bookings/user
Cancel a Booking (User Only) Route: DELETE /api/bookings/:id

### live server: https://sports-facility-booking-server.vercel.app/

<img src="/ER Diagram.png">
