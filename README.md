# Game Inventory App

A full-stack web application for managing a game inventory. This app lets you view, create, update, and delete games and categories using a Node.js backend with Express and PostgreSQL. It utilizes **express-validator** for input validation, **dotenv** for environment configuration, and **multer** for handling file uploads. The app is deployed on Render.

https://inventory-app-rzaf.onrender.com


## Features

- **CRUD Operations:** Create, read, update, and delete games and categories.
- **Data Validation:** Robust input validation using express-validator.
- **File Uploads:** Support for game image uploads via multer.
- **Environment Management:** Secure configuration with dotenv.
- **Responsive UI:** Dynamic content rendering using EJS templates.
- **Cloud Deployment:** Live deployment on Render.

## Technologies Used

- **Node.js** – JavaScript runtime
- **Express** – Web framework
- **PostgreSQL** – Relational database
- **express-validator** – Server-side validation
- **dotenv** – Environment variable management
- **multer** – File upload middleware
- **EJS** – Templating engine
- **Render** – Cloud hosting platform

## Database Design

### Games Table
- **id:** Primary Key
- **name:** Game title
- **release_date:** Release date of the game
- **rating:** Game rating
- **price:** Game price
- **game_image:** Binary data or file path for game image
- **developer:** Developer name
- **description:** Detailed game description

### Categories Table
- **id:** Primary Key
- **name:** Category name (e.g., genre)
- **description:** Optional description
- **category_image:** Binary data for category image

### Games-Categories Relationship
- Many-to-many relationship between games and categories.
- A game can belong to multiple categories.
- A category can have multiple games.
