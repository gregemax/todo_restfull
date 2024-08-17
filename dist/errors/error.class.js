class errorclass extends Error {
    constructor(message, status) {
        super(message || "some error occurred");
        this.status = status || 300;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = errorclass;
