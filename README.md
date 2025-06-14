
# PropertyMatch AI

A property matching application with AI-powered recommendations.

## Project Structure

```
property-match-ai/
├── frontend/           # React frontend application
└── backend/            # Express backend application
```

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root of the backend folder
   - Add the following variables:
   ```
   MONGODB_URI=mongodb+srv://your_username:your_password@your-cluster.mongodb.net/propertydb
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```
   - Replace placeholder values with your actual MongoDB connection string and a secure JWT secret

4. Start the backend server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:5000

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```
   The application will be available at http://localhost:5173

## Testing the Application

1. Register a new user at http://localhost:5173/register
2. Log in with your credentials at http://localhost:5173/login
3. Set your property preferences
4. Browse available properties with AI-powered compatibility scores

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login existing user
- GET /api/users/profile - Get current user profile

### Properties
- GET /api/properties - Get all properties
- GET /api/properties/:id - Get property by ID
- POST /api/properties - Add new property (admin only)
- PUT /api/properties/:id - Update property (admin only)
- DELETE /api/properties/:id - Delete property (admin only)

### User Preferences
- PUT /api/users/preferences - Update user preferences
