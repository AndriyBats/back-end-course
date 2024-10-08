"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3003;
const jsonBodyMiddleWare = express_1.default.json();
app.use(jsonBodyMiddleWare);
const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automation qa' },
        { id: 4, title: 'devops' },
    ],
};
app.get('/', (req, res) => {
    const a = 4;
    if (a > 5) {
        res.send({ message: 'Hello World!55555555' });
    }
    else {
        res.send({ message: 'Hello World!44444444' });
    }
});
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCourses);
});
// fetch('http://localhost:3003/courses', {method: 'GET'})
// .then(res => res.json())
// .then(json => console.log(json))
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find((c) => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    res.json(foundCourse);
});
app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const newCourse = {
        id: +(new Date()),
        title: req.body.title,
    };
    db.courses.push(newCourse);
    res
        .status(201)
        .json(newCourse);
});
// fetch('http://localhost:3003/courses', {method: 'POST', body: JSON.stringify({title: ''}), headers: {'Content-Type': 'application/json'}})
// .then(res => res.json())
// .then(json => console.log(json))
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(204);
});
// fetch('http://localhost:3003/courses/1', {method: 'DELETE'})
app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    foundCourse.title = req.body.title;
    res.json(foundCourse);
});
// fetch('http://localhost:3003/courses/1', {method: 'PUT', body: JSON.stringify({title: 'dddddddddddddddddddd'}), headers: {'Content-Type': 'application/json'}})
// .then(res => res.json())
// .then(json => console.log(json))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
