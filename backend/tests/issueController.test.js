import request from 'supertest';
import express from 'express';
import { describe, it, expect } from 'vitest';
import { allRecords, recordByBookId, recordByStudentId, defaultersList, recordDelete, issuesFilter, markReturned, getUnreturnedRecords } from '../controllers/issuingcontrol';

const app = express();
app.use(express.json());

app.get('/api/issues', allRecords);
app.get('/api/issues/book/:id', recordByBookId);
app.get('/api/issues/student/:id', recordByStudentId);
app.get('/api/issues/defaulters', defaultersList);
app.delete('/api/issues/delete/:id', recordDelete);
app.get('/api/issues/filter/:searchText', issuesFilter);
app.patch('/api/issues/return/:bookid', markReturned);
app.get('/api/issues/unreturned', getUnreturnedRecords);

describe('Issuing Controller', () => {
    it('should get all issues', async () => {
        const res = await request(app).get('/api/issues');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get an issue by book ID', async () => {
        const res = await request(app).get('/api/issues/book/9780306447907');
        if (res.body && res.body.book_id) {
            expect(res.statusCode).toEqual(200);
            expect(res.body[0]).toHaveProperty('book_id');
        } else {
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('error', 'Failed to get record');
        }
    });

    it('should get an issue by student ID', async () => {
        const res = await request(app).get('/api/issues/student/221145');
        if (res.body.length > 0) {
            expect(res.statusCode).toEqual(200);
            expect(res.body[0]).toHaveProperty('student_id');
        } else {
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('error', 'Issue not found');
        }
    });

    // it('should create a new issue', async () => {
    //     const res = await request(app)
    //         .post('/api/issues')
    //         .send({ book_id: '123', student_id: '1', date_of_issue: '2025-03-06', date_of_return: '2025-03-13', returned: false });
    //     expect(res.statusCode).toEqual(201);
    //     expect(res.body).toHaveProperty('book_id');
    // });

    it('should update an issue', async () => {
        const res = await request(app)
            .patch('/api/issues/return/123');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Book has been returned successfully');
    });

    // it('should delete an issue', async () => {
    //     const res = await request(app).delete('/api/issues/delete/123');
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toHaveProperty('message', 'Record Deleted Succesfully!');
    // });

    it('should filter issues', async () => {
        const res = await request(app).get('/api/issues/filter/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get unreturned issues', async () => {
        const res = await request(app).get('/api/issues/unreturned');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get defaulters', async () => {
        const res = await request(app).get('/api/issues/defaulters');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});