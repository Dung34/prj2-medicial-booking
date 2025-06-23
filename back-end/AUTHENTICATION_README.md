# Authentication System Documentation

## Overview
This application implements a secure authentication system using JWT (JSON Web Tokens) with refresh tokens stored in HTTP-only cookies.

## Features

### Backend Authentication
- **Login**: `/login` - Authenticates users and returns access token
- **Refresh**: `/login/refresh` - Refreshes access token using refresh token from cookies
- **Logout**: `/login/logout` - Clears refresh token cookie
- **Register**: `/login/signIn` - Registers new users

### Frontend Authentication
- **Automatic Token Refresh**: Axios interceptors automatically refresh expired tokens
- **Protected Routes**: Route-level authentication and authorization
- **Persistent Sessions**: Refresh tokens stored in HTTP-only cookies
- **Role-based Access**: Different access levels for patients and doctors

## Security Features

### JWT Tokens
- **Access Token**: Short-lived (15 minutes) for API requests
- **Refresh Token**: Long-lived (7 days) stored in HTTP-only cookies
- **Secure Cookies**: HttpOnly, SameSite=strict, secure in production

### Token Storage
- Access tokens stored in React state (memory)
- Refresh tokens stored in HTTP-only cookies (not accessible via JavaScript)
- Automatic token refresh on 401 responses

## API Endpoints

### Authentication Routes
```javascript
POST /login
// Login with email, password, role
// Returns: accessToken, user data
// Sets: refreshToken cookie

POST /login/refresh
// Refresh access token using refresh token from cookie
// Returns: new accessToken
// Sets: new refreshToken cookie

POST /login/logout
// Clear refresh token cookie
// Returns: success message

POST /login/signIn
// Register new user
// Returns: user data
```

## Frontend Usage

### Login
```javascript
const { login, isLoading, error } = useAuth()

const handleLogin = async () => {
  const result = await login(email, password, role)
  if (result.success) {
    // Redirect to dashboard
  } else {
    // Show error message
  }
}
```

### Protected Routes
```javascript
// Protect any route
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>

// Protect with role requirements
<ProtectedRoute allowedRoles={['doctor']}>
  <DoctorDashboard />
</ProtectedRoute>
```

### Logout
```javascript
const { logout } = useAuth()

const handleLogout = async () => {
  await logout()
  // User will be redirected to login
}
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
DATABASE_URL=your_mongodb_connection_string

# JWT Secrets (Change these in production!)
ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

## Security Best Practices

1. **Use Strong Secrets**: Generate strong random strings for JWT secrets
2. **Environment Variables**: Never commit secrets to version control
3. **HTTPS in Production**: Always use HTTPS in production environments
4. **Token Expiration**: Keep access tokens short-lived
5. **Cookie Security**: Use HttpOnly and Secure flags for cookies
6. **CORS Configuration**: Properly configure CORS for your domains

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure CORS is properly configured for your frontend domain
2. **Cookie Not Set**: Check that `withCredentials: true` is set in axios requests
3. **Token Expired**: The system should automatically refresh tokens, check interceptor setup
4. **Authentication Errors**: Verify JWT secrets are properly set in environment variables

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your environment variables. 