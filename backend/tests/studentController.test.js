import request from 'supertest';
import express from 'express';
import { describe, it, expect } from 'vitest';
import { allStudents, studentByID, createStudent, changeStudent, removeStudent } from '../controllers/studentcontrol';

const app = express();
app.use(express.json());

app.get('/api/students', allStudents);
app.get('/api/students/:id', studentByID);
app.post('/api/students', createStudent);
app.patch('/api/students/:oldid', changeStudent);
app.delete('/api/students/:id', removeStudent);

describe('Student Controller', () => {
    it('should get all students', async () => {
        const res = await request(app).get('/api/students');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get a student by ID', async () => {
        const res = await request(app).get('/api/students/1');
        if (res.body && res.body.roll_no) {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('roll_no');
        } else {
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('error', 'Student not found');
        }
    });

    it('should create a new student', async () => {
        const res = await request(app)
            .post('/api/students')
            .send({ roll_no: '123', name: 'New User', email: 'user@example.com', contact: '1234567890' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('roll_no');
    });

    it('should update a student', async () => {
        const res = await request(app)
            .patch('/api/students/123')
            .send({ roll_no: '123', name: 'Updated User', email: 'updated@example.com', contact: '0987654321' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('roll_no');
    });

    it('should delete a student', async () => {
        const res = await request(app).delete('/api/students/123');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Student deleted successfully');
    });
});