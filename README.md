# Scatch - A Bag Shop 👜

Scatch is a full-stack web application for an online bag shop, where users can browse, register, and purchase bags. Built with Node.js and Express, this project features secure authentication, image uploads, and a user-friendly interface for a smooth shopping experience.
🎉 **Check out the live version of Scatch on Render and start shopping for your favorite bags today!** [Visit Scatch on Render](https://your-render-link.com)


## Features
- **User Authentication**: Sign up, log in, and secure sessions with `jsonwebtoken`, `bcrypt`, and `express-session`.
- **Product Management**: Upload, edit, and delete bag listings with `multer` for image handling.
- **Secure Routes and Data Validation**: Protected routes and data validation with `joi`.
- **Flash Messages**: Real-time feedback to users with `connect-flash`.
- **Template Rendering**: Dynamic pages created using `ejs`.
- **Environment Configuration**: Configuration managed securely with `dotenv`.

## Technologies Used
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Template Engine**: EJS
- **Image Uploads**: Multer
- **Validation**: Joi
- **Authentication**: JSON Web Tokens (JWT), Bcrypt
- **Environment Variables**: Dotenv

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/scatch-bag-shop.git
   cd scatch-bag-shop
2. **Install dependencies:**
   ```bash
   npm install
3. **Create a .env file in the root directory with the following environment variables:**
   ```bash
    PORT=3000
    MONGODB_URI=<your-mongodb-uri>
    SECRET_KEY=<your-jwt-secret-key>
4. **Start the server:**
   ```bash
   npm start
## Project Structure
    ```bash
      scatch-bag-shop
      ├── app.js                 # Main application file
      ├── models                 # Mongoose schemas
      ├── routes                 # Application routes
      ├── views                  # EJS templates
      ├── public                 # Static assets (CSS, images, etc.)
      ├── middleware             # Custom middleware
      └── .env                   # Environment variables

## Usage
- **Browse Bags**: Explore the available bags on the homepage.
- **Register/Login**: Create an account or log in to manage your profile.
- **Add/Edit Bags**: If you’re an admin, upload and manage bag listings.
- **Shopping Cart**: Add items to your cart and checkout.

## Future Improvements
- Add payment gateway integration.
- Implement a review and rating system.
- Enhance product search and filtering.
