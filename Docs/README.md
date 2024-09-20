#  Cloud Native CMS

## Project Description

Cloud Native CMS is a Content Management System (CMS) designed to be lightweight, fast, and easy to deploy on cloud platforms. It provides a secure and efficient interface for managing articles, users, and image uploads. The CMS features user authentication, role-based access control, and a simple, intuitive front-end interface for handling CRUD operations on articles.

## Installation and Setup

To run this project locally, follow the steps below:

1. **Clone the repository**:

   ```bash
   https://github.com/NicoleKap/NicoleKap-CMS-CloudNative-Challenge
   cd cloud-native-cms

   ```

2. **npm install**

3. **Create a .env file in the root directory and add the necessary environment variables:**

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=90d
MONGO_URI=your_mongodb_connection_string

4. **npm start**


---

## 5. **Usage Instructions**

1. **Sign Up and Log In**:
   - Open the browser and go to `http://127.0.0.1:3001/public/index.html`.
   - Use the registration form to create a new account.
   - Log in using the credentials.
   
2. **Article Management**:
   - Once logged in, navigate to the dashboard.
   - You can create, update, and delete articles from the dashboard interface.
   - Use the "Load Articles" button to fetch and view all articles.

3. **Image Upload**:
   - When creating a new article, you can upload an image that will be saved to the server and linked to the article.

## API Endpoints

### Authentication Endpoints

- **POST /api/auth/register**: Register a new user.
  - Body: `{ "username": "string", "email": "string", "password": "string", "role": "string" }`
  
- **POST /api/auth/login**: Log in with username and password.
  - Body: `{ "username": "string", "password": "string" }`
  
### Article Management Endpoints

- **GET /api/articles**: Retrieve all articles (Authenticated).
  
- **POST /api/articles**: Create a new article (Authenticated).
  - Body: `{ "title": "string", "content": "string", "author": "ObjectId", "image": "file" }`
  
- **PUT /api/articles/:id**: Update an existing article by ID (Authenticated).
  - Body: `{ "title": "string", "content": "string", "author": "ObjectId" }`
  
- **DELETE /api/articles/:id**: Delete an article by ID (Authenticated).
  
### Image Upload Endpoint

- **POST /api/upload**: Upload an image (Authenticated).
  - Body: `multipart/form-data { "image": "file" }`

## Front-End Description

The front-end is built using HTML, CSS, and JavaScript and provides an interface for:

1. **User Authentication**: Users can register and log in through the forms.
2. **Article Management**: Once logged in, users can view, create, update, and delete articles.
3. **Dynamic Loading**: The articles can be dynamically fetched and displayed in the dashboard using API calls.
4. **Image Handling**: Users can upload images along with articles which will be stored on the server.

Postman was used to test and document the API endpoints for backend development.

## Technologies Used

- **Node.js**: Backend server
- **Express.js**: Web framework for Node.js
- **MongoDB**: Database for storing users, articles, and images
- **Mongoose**: ODM for MongoDB
- **JWT (JSON Web Token)**: For user authentication
- **Multer**: For image uploads
- **HTML/CSS/JavaScript**: Front-end development
- **Postman**: For API testing

## Features

- **User Registration and Login**: Secure authentication using JWT.
- **Role-Based Access**: Different access levels for admin users.
- **CRUD Operations for Articles**: Users can create, read, update, and delete articles.
- **Image Upload**: Users can upload images for articles.
- **Token-Based Authentication**: Ensures secure API requests.

## Contributors

- [Nikoleta Kapsa](https://github.com/NicoleKap)
