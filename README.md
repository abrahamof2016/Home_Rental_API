# Home_Rental_API

This project implements a REST API for managing home rental service using Express.js and mongoDB database. The API allows users to create, retrieve, update, delete, and search for homes.

### Getting Started

1.  **Prerequisites:**

* Node.js and npm (or yarn) installed on your system.
* A mongoDB database.

2. **Clone the repository:**

```bash
git clone https://github.com/abrahamof2016/Home_Rental_API.git
```
3. **Install dependencies:**

``` bash
cd Home_Rental_API
cd nodejs-express-mysql --view=pug
npm install
```

4. **Configure database connection:**

Create an account with MongoDB Atlas(this is free, and just required that you enter basic contact details and acknowledge their terms of service).

**To create a MongoDB Atlas database, follow this [link](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database).**

5. **Start the server:**

``` bash
npm run devstart
(or yarn start)
```

This will start the Express server and make the API endpoints available.

## API Endpoints

The API provides the following endpoints for managing home rental:

```Markdown

| Method | URL | Description |
| ---- |
| GET | | /search | | Home Page |
| GET | | /search/<objects> | | The list of all homes, homeinstances, types and owners(e.g /search/homes, /search/types/, etc) |
| GET | | /search/<objects>/<id> | | The detial page for a specific object(e.g /search/homes/<id>), etc |
| GET | | /search/<objects>/create | | The form to create home, homeinstance, type, or owner with the given _id field value. (e.g /search/home/create). |
| POST | | /search/<objects>/create | | The form to create home, homeinstance, type, or owner with the given _id field value. (e.g /search/home/create). |
| GET | | /search/<objects>/<id>/update | The form to update a specific home, homeinstance, type, or owner with the given _d field value. (e.g. /search/home/<id>/update). |
| POST | | /search/<objects>/<id>/update | The form to update a specific home, homeinstance, type, or owner with the given _d field value. (e.g. /search/home/<id>/update). |
| GET | | /search/<objects>/<id>/delete | The form to delete a specific home, homeinstance, type, or owner with the given _d field value. (e.g. /search/home/<id>/delete). |
| POST | | /search/<objects>/<id>/delete | The form to delete a specific home, homeinstance, type, or owner with the given _d field value. (e.g. /search/home/<id>/delete). |
```

Note: The /search/<objects> endpoint without an ID always returns an list of objects. The endpoint with an ID expects a numeric ID and returns a single object or an error message if the object is not found.

## Testing the API

Since this project utilizes the Pug templating engine, you can easily test the API endpoints directly in your web browser.

* Get a home page:

``` bash
http://localhost:3000/search
```

* Get all homes:

``` bash
http://localhost:3000/search/homes
```

* Get a home by ID:

``` bash
http://localhost:3000/search/home/679257e2bb7fec80aaabbfda
```

Remeber to replace http://localhost:3000 with the actual URL of your server if it's running on a different port

