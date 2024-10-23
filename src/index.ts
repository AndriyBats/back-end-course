import express, {Request, Response} from 'express'
import { CourseViewModal } from './models/courseViewModel'
import { CourseCreateModal } from './models/CreateCourseModel'
import { CourseUpdateModal } from './models/UpdataCourseModel'
import { QueryCoursesModal } from './models/QueryCoursesModel'
import { URIParamsCourseModal } from './models/URIParamsCourseModel'
import { RequestWithBody, RequestWithQuery, RequestWithParams, RequestWithParamsAndBody } from './types'
import { title } from 'process'

const app = express()
const port = 3003

const jsonBodyMiddleWare = express.json()

app.use(jsonBodyMiddleWare)

type CourseTypes = {
  id: number,
  title: string,
  studentsCount: number,
}

const db: {courses: CourseTypes[]} = {
  courses: [
    {id: 1, title: 'front-end', studentsCount: 10},
    {id: 2, title: 'back-end', studentsCount: 8},
    {id: 3, title: 'automation qa', studentsCount: 2},
    {id: 4, title: 'devops', studentsCount: 5},
  ],
}

app.get('/', (req, res) => {
  const a = 4
  if (a > 5 ) {
    res.send({message: 'Hello World!55555555'})
  } else {
    res.send({message: 'Hello World!44444444'})
  }
})

app.get('/courses', (
  req: RequestWithQuery<QueryCoursesModal>,
  res: Response<CourseViewModal[]>
) => {
  let foundCourses = db.courses
  if (req.query.title) {
    foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1)
  }

  res.json(foundCourses.map(dbCourse => {
    return {
      id: dbCourse.id,
      title: dbCourse.title,
    }
  }))
})

// fetch('http://localhost:3003/courses', {method: 'GET'})
// .then(res => res.json())
// .then(json => console.log(json))

app.get('/courses/:id', (req: RequestWithParams<URIParamsCourseModal>, res) => {

  const foundCourse = db.courses.find((c: any) => c.id === +req.params.id)

  if (!foundCourse) {
    res.sendStatus(404)

    return
  }

  res.json({
    id: foundCourse.id,
    title: foundCourse.title,
  })
})

app.post('/courses', (
  req: RequestWithBody<CourseCreateModal>,
  res: Response<CourseViewModal>
) => {
  if (!req.body.title) {
    res.sendStatus(400)

    return
  }

  const newCourse: CourseTypes = {
    studentsCount: 0,
    id: +(new Date()),
    title: req.body.title,
  }

  db.courses.push(newCourse)
  res
    .status(201)
    .json(newCourse)
})

// fetch('http://localhost:3003/courses', {method: 'POST', body: JSON.stringify({title: ''}), headers: {'Content-Type': 'application/json'}})
// .then(res => res.json())
// .then(json => console.log(json))

app.delete('/courses/:id', (req: RequestWithParams<URIParamsCourseModal>, res) => {

  db.courses = db.courses.filter(c => c.id !== +req.params.id)

  res.sendStatus(204)
})

// fetch('http://localhost:3003/courses/1', {method: 'DELETE'})

app.put('/courses/:id', (
  req: RequestWithParamsAndBody<URIParamsCourseModal, CourseUpdateModal>,
  res: Response<CourseViewModal>
) => {
  if (!req.body.title) {
    res.sendStatus(400)

    return
  }

  const foundCourse = db.courses.find(c => c.id === +req.params.id)

  if (!foundCourse) {
    res.sendStatus(404)

    return
  }

  foundCourse.title = req.body.title

  res.json(foundCourse)
})

// fetch('http://localhost:3003/courses/1', {method: 'PUT', body: JSON.stringify({title: 'dddddddddddddddddddd'}), headers: {'Content-Type': 'application/json'}})
// .then(res => res.json())
// .then(json => console.log(json))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})