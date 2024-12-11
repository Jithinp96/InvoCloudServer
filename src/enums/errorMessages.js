const ErrorMessages = Object.freeze({
    INTERNAL_SERVER_ERROR: "Oops! Something went wrong on our end. Please try again later!",
    REFRESH_TOKEN_NOT_FOUND: "Your session has expired. Please log in again!",
    INVALID_CREDENTIALS: "Invalid credentials. Please try again!",
    NOT_FOUND: (entity) => `${entity} not found!`,
})

export default ErrorMessages