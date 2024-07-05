"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.dbConnection = process.env.DB_CONNECTION;
if (!exports.dbConnection) {
    throw new Error('DB_CONNECTION is not defined in .env file');
}
mongoose_1.default.connect(exports.dbConnection)
    .then(() => console.log('Connected to DB!'))
    .catch((err) => {
    if (err instanceof Error) {
        console.error('Failed to connect to DB:', err.message);
    }
    else {
        console.error('Failed to connect to DB:', err);
    }
});
