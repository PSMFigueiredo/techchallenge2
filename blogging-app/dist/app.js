"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const posts_1 = __importDefault(require("./routes/posts"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/posts', posts_1.default);
app.use('/userRoutes', userRoutes_1.default);
const dbConnection = process.env.DB_CONNECTION;
if (!dbConnection) {
    throw new Error('DB_CONNECTION is not defined in .env file');
}
mongoose_1.default.connect(dbConnection)
    .then(() => console.log('Connected to DB!'))
    .catch((err) => {
    if (err instanceof Error) {
        console.error('Failed to connect to DB:', err.message);
    }
    else {
        console.error('Failed to connect to DB:', err);
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
