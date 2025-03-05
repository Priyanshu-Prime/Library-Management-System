import request from 'supertest';
import express from 'express';
import { describe, it, expect } from 'vitest';
import { allBooks, oneBook, createBook, changeBook, removeBook, bookFilter } from '../controllers/bookcontrol';

const app = express();
app.use(express.json());

app.get('/api/books', allBooks);
app.get('/api/books/:id', oneBook);
app.post('/api/books', createBook);
app.patch('/api/books/:oldid', changeBook);
app.delete('/api/books/:id', removeBook);
app.get('/api/books/filter/:searchterm', bookFilter);

describe('Book Controller', () => {
    it('should get all books', async () => {
        const res = await request(app).get('/api/books');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get a book by ID', async () => {
        const res = await request(app).get('/api/books/9781265058432');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should create a new book', async () => {
        const res = await request(app)
            .post('/api/books')
            .send({ id: '123', name: 'New Book', author: 'Author', image: 'image_url' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should update a book', async () => {
        const res = await request(app)
            .patch('/api/books/123')
            .send({ id: '123', name: 'Updated Book', author: 'Updated Author', image: 'updated_image_url' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should delete a book', async () => {
        const res = await request(app).delete('/api/books/123');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Book deleted successfully');
    });

    it('should filter books', async () => {
        const res = await request(app).get('/api/books/filter/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});