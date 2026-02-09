# Fitness Tracker

## Project Description

A comprehensive fitness tracking application designed to help users monitor their daily activities and food intake. The application features AI-powered food analysis to automatically detect food items from images and estimate nutritional information.

## Features

-   **Activity Logging**: Track various physical activities, including duration and calories burned.
-   **Food Logging**: Log daily meals with detailed nutritional breakdowns.
-   **AI Food Analysis**: Upload food images to automatically identify food items and get estimated calorie counts using Google GenAI.
-   **User Authentication**: Secure user registration and login functionality.
-   **Dashboard**: Visual overview of daily progress and statistics.

## Tech Stack

### Frontend
-   **Framework**: React (Vite)
-   **Language**: TypeScript
-   **Styling**: TailwindCSS
-   **State Management**: React Hooks
-   **Routing**: React Router DOM

### Backend
-   **CMS**: Strapi (Headless CMS)
-   **Database**: SQLite (Default)
-   **AI Integration**: Google GenAI
-   **Language**: TypeScript/Node.js

## Folder Structure

-   **client/**: Contains the React frontend application.
    -   `src/components`: Reusable UI components.
    -   `src/pages`: Application views/pages.
    -   `src/context`: React context for state management.
-   **server/**: Contains the Strapi backend application.
    -   `src/api`: API definitions (controllers, routes, services) for content types (food-log, activity-log) and custom endpoints (image-analysis).
    -   `config/`: Server and database configuration.

## Installation & Setup

### Prerequisites
-   Node.js (v18 or higher recommended)
-   npm or yarn

### Client Setup

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Server Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Strapi server:
    ```bash
    npm run develop
    ```
    The API will be available at `http://localhost:1337`.
    The Admin Panel will be available at `http://localhost:1337/admin`.

## API Endpoints

### Authentication
-   `POST /api/auth/local/register` - Register a new user
-   `POST /api/auth/local` - Login user

### Activity Logs
-   `GET /api/activity-logs` - Retrieve activity logs
-   `POST /api/activity-logs` - Create a new activity log
-   `PUT /api/activity-logs/:id` - Update an activity log
-   `DELETE /api/activity-logs/:id` - Delete an activity log

### Food Logs
-   `GET /api/food-logs` - Retrieve food logs
-   `POST /api/food-logs` - Create a new food log
-   `PUT /api/food-logs/:id` - Update a food log
-   `DELETE /api/food-logs/:id` - Delete a food log

### Image Analysis
-   `POST /api/image-analysis` - Analyze an uploaded food image

## Author

[Rahman Halik]
