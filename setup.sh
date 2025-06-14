
#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
  echo "Node.js is required but not installed. Please install Node.js and try again."
  exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
  echo "npm is required but not installed. Please install npm and try again."
  exit 1
fi

# Create project structure
echo "Setting up project structure..."

# Set up backend
echo "Installing backend dependencies..."
cd backend
npm install

# Set up frontend
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Return to root directory
cd ..

# Display completion message
echo ""
echo "Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Configure backend/.env with your MongoDB URI and JWT secret"
echo "2. Start the backend server: cd backend && npm run dev"
echo "3. Start the frontend server: cd frontend && npm run dev"
echo ""
echo "For more information, see the README.md file."
