# DreamyDestiny (Airbnb Clone)

DreamyDestiny is a full-stack Airbnb-style listing platform built with Node.js, Express, MongoDB, EJS, and Bootstrap.

Users can sign up, log in, create listings with image uploads, add reviews, and view listing locations on a map.

## Live Demo

https://airbnbclone-qn59.onrender.com

## Features

- User authentication (signup, login, logout) with Passport Local
- Create, read, update, delete listings
- Listing ownership authorization (only owner can edit/delete)
- Image uploads via Multer + Cloudinary
- Reviews with rating + comments
- Review author authorization (only author can delete)
- Server-side validation using Joi
- Flash messages for success/error feedback
- Location geocoding via LocationIQ API
- Map view on listing detail page using MapLibre

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS + EJS-Mate
- Passport + passport-local-mongoose
- Express Session + connect-mongo
- Multer + Cloudinary
- Joi
- Bootstrap 5

## Project Structure

```text
airbnbclone/
|- app.js
|- middleware.js
|- schema.js
|- cloudConfig.js
|- controllers/
|  |- listing.js
|  |- reviews.js
|  |- users.js
|- routes/
|  |- listing.js
|  |- review.js
|  |- user.js
|- models/
|  |- listing.js
|  |- reviews.js
|  |- user.js
|- init/
|  |- index.js
|  |- data.js
|- views/
|- public/
|- utils/
```

## Environment Variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
FORWARD_GEO=your_locationiq_api_key
```

## Installation

```bash
npm install
```

## Run the App

```bash
node app.js
```

App runs at:

```text
http://localhost:8080
```

## Seed Sample Data (Optional)

The seed script uses local MongoDB (`mongodb://127.0.0.1:27017/wanderlust`) as configured in `init/index.js`.

```bash
node init/index.js
```

## Main Routes

### Listing Routes

- `GET /listing` - all listings
- `GET /listing/new` - create form
- `POST /listing/new` - create listing
- `GET /listing/:id/show` - listing details
- `GET /listing/:id/edit` - edit form
- `PUT /listing/:id/edit` - update listing
- `DELETE /listing/:id/delete` - delete listing

### Review Routes

- `POST /listing/:id/reviews` - add review
- `DELETE /listing/:id/reviews/:reviewid` - delete review

### Auth Routes

- `GET /signup` - signup form
- `POST /signup` - register user
- `GET /login` - login form
- `POST /login` - login user
- `GET /logout` - logout user

## Notes

- Keep `.env` private and never commit secrets.
- For Atlas-based deployment, ensure your MongoDB URL includes the intended database name.

## Author

Krishna
