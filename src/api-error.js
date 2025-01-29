class ApiError extends Error {
    constructor(statusCode, errors = {}){
        super();
        this.statusCode = statusCode;
        this.message = "error";
        this.data = errors;
    }
}

module.exports = ApiError;