"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(usersRoute_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
