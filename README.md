# Bookish -  Frontend
This repository is the client side application for Bookish, a full-stack web application developed as a bootcamp capstone project. Built with React, it provides an intuitive user interface for exploring books, managing personal reading lists, writing reviews, and interacting with the backend REST API. Reference API: https://openlibrary.org/developers/api

## Tech Stack
- Library: React.js
- Routing: React Router
- HTTP Client: Axios
- State Management: React Context and Local Storage
- Styling: CSS
- Testing: Jest and React Testing Library

## Project Structure
```bookish-frontend/
|--public/
|--src/
    |--components/
    |   |--auth/        # Login, Register, and UserContext Components
    |   |--Books/       # Book cataloging, details, search cards, and reviews
    |   |--Lists/       # Reading list management and custom list views
    |   |--Search/      # Book search pages, forms, and results display
    |   |--Users/       # User profile and profile editing components
    |--css/             # Stylesheets
    |--App.js           # Root component and application layout
    |--BookishAPI.js    # API for backend communication
    |__Index.js         # Application entry point
```
## Getting Started
Prerequisites: Bookish-backend repository running locally or deployed.

Installation
1. Clone the respository:
    git clone https://github.com/tdrudi/bookish-frontend.git
    cd bookish-frontend

2. Install dependencies:
    npm install

3. Configure environment variables:
    BASE_URL = http://localhost:3001

4. Run the development server
    npm start

Open http://localhost:3001 to view in the browser.

5. Running tests:
    npm test

## Core Features and User Flow
- Authentication: Users can sign up for a new account or log in securely using JSON Web Token (JWT)
- Book Discovery: Users can search for books, view detailed metadata, and read community reviews.
- Reading Lists: Users can create, customize, and manage personal reading lists to track reading goals.
- Reviews and Ratings: Users can rate books and write reviews to share insights with others.








