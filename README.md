# MoveIN - Property Rental and Sales Platform

A modern, minimalist website for property listings, following 2025 design trends.

## Project Structure

The project consists of two main parts:

1. **Frontend**: React application with Tailwind CSS
2. **Backend**: Node.js API with Express and MongoDB

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local installation or access to MongoDB Atlas)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd movein-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/movein
   NODE_ENV=development
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The API will be available at http://localhost:5000/api

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd movein-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The application will be available at http://localhost:3000

## Features

- Modern, minimalist UI design
- Responsive layout for all device sizes
- Property listings with filtering options
- Animated transitions using Framer Motion
- API integration with backend

## Technologies Used

### Frontend
- React
- Tailwind CSS
- React Router
- Framer Motion
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication (to be implemented)

## Development Roadmap

- [x] Initial setup
- [x] Basic UI components
- [x] Property listing page
- [ ] Property details page
- [ ] User authentication
- [ ] Property search and filtering
- [ ] Admin dashboard
- [ ] Booking/enquiry system 