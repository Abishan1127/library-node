"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const booksPath = path_1.default.join(__dirname, 'books.json');
const books = JSON.parse((0, fs_1.readFileSync)(booksPath, 'utf-8'));
console.log(books);
console.log(books);
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
const readBooks = () => JSON.parse((0, fs_1.readFileSync)(booksPath, "utf-8"));
const writeBooks = (data) => (0, fs_1.writeFileSync)(booksPath, JSON.stringify(data, null, 2));
app.get("/books", (req, res) => {
    const books = readBooks();
    res.json(books);
});
app.get("/api/books/:id", (req, res) => {
    const books = readBooks();
    const book = books.find((b) => b.id === parseInt(req.params.id));
    book ? res.json(book) : res.status(404).send("Book not found");
});
app.post("/api/books", (req, res) => {
    const books = readBooks();
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    writeBooks(books);
    res.status(201).json(newBook);
});
app.put("/api/books/:id", (req, res) => {
    const books = readBooks();
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (book) {
        Object.assign(book, req.body);
        writeBooks(books);
        res.json(book);
    }
    else {
        res.status(404).send("Book not found");
    }
});
app.delete("/api/books/:id", (req, res) => {
    const books = readBooks();
    const index = books.findIndex((b) => b.id === parseInt(req.params.id));
    if (index !== -1) {
        books.splice(index, 1);
        writeBooks(books);
        res.status(204).send();
    }
    else {
        res.status(404).send("Book not found");
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on XXXXXXXXXXXXXXXX:${PORT}`);
});
