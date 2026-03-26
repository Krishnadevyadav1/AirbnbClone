# WanderLust - Airbnb Clone

A full-stack listing app inspired by Airbnb, built with Express, MongoDB, EJS, and Bootstrap.

## Overview

WanderLust is a CRUD-based rental listing platform where users can:

- Browse all listings
- View individual listing details
- Create a new listing
- Edit an existing listing
- Delete a listing

The app uses server-side rendering with EJS and stores data in MongoDB with Mongoose.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS + EJS-Mate
- Bootstrap 5
- Method-Override

## Features

- REST-style listing routes with clean page navigation
- Form validation styling using Bootstrap validation classes
- Reusable layout with navbar + footer partials
- Seed script with sample listing data
- Custom error class + centralized error handler

## Project Structure

```text
airbnbclone/
|- app.js
|- package.json
|- models/
|  |- listing.js
|- init/
|  |- index.js
|  |- data.js
|- utils/
|  |- ExpressError.js
|  |- wrapAsync.js
|- public/
|  |- css/style.css
|  |- js/script.js
|- views/
|  |- layouts/boilerplate.ejs
|  |- includes/navbar.ejs
|  |- includes/footer.ejs
|  |- listing/
|     |- index.ejs
|     |- show.ejs
|     |- new.ejs
|     |- edit.ejs
```

## Getting Started

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd airbnbclone
npm install
```

### 2. Start MongoDB locally

Make sure MongoDB is running on:

```text
mongodb://127.0.0.1:27017/wanderlust
```

### 3. Seed sample data (optional)

```bash
node init/index.js
```

### 4. Run the app

```bash
node app.js
```

Open in browser:

```text
http://localhost:8080
```

## Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Redirect to listings |
| GET | `/listing` | Show all listings |
| GET | `/listing/new` | New listing form |
| POST | `/listing/new` | Create listing |
| GET | `/listing/:id/show` | Listing details |
| GET | `/listing/:id/edit` | Edit form |
| PUT | `/listing/:id/edit` | Update listing |
| DELETE | `/listing/:id/delete` | Delete listing |



## Author

Krishna
