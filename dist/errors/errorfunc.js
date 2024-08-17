"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorfunc = void 0;
const errorfunc = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((er) => next(er));
    };
};
exports.errorfunc = errorfunc;
