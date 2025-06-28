
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        if (data !== undefined && data !== null && Object.keys(data).length !== 0) {
            this.data = data;
        }
        this.message = message;
        this.success = statusCode < 400;
    }
}

export {
    asyncHandler,
    ApiResponse
}