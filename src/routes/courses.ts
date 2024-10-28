import express, { Response } from 'express'
import { CourseViewModal } from '../models/CourseViewModel'
import { CourseCreateModal } from '../models/CreateCourseModel'
import { CourseUpdateModal } from '../models/UpdataCourseModel'
import { QueryCoursesModal } from '../models/QueryCoursesModel'
import { URIParamsCourseModal } from '../models/URIParamsCourseModel'
import { RequestWithBody, RequestWithQuery, RequestWithParams, RequestWithParamsAndBody } from '../types'
import { db, CourseType } from '../db/db'
import { HTTP_STATUSES } from '../constants/constants'



const getCourseViewModel = (dbCourse: CourseType): CourseViewModal => {
    return {
      id: dbCourse.id,
      title: dbCourse.title,
    }
}

export const getCoursesRouter = () => {
    const router = express.Router();

    router.get('/', (
        req: RequestWithQuery<QueryCoursesModal>,
        res: Response<CourseViewModal[]>
    ) => {
        let foundCourses = db.courses
        if (req.query.title) {
          foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1)
        }

        res.json(foundCourses.map(getCourseViewModel))
    })

    // fetch('http://localhost:3003/courses', {method: 'GET'})
    // .then(res => res.json())
    // .then(json => console.log(json))

    router.get('/:id', (req: RequestWithParams<URIParamsCourseModal>, res) => {

      const foundCourse = db.courses.find((c: any) => c.id === +req.params.id)

      if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

        return
      }

      res.json(getCourseViewModel(foundCourse))
    })

    router.post('/', (
      req: RequestWithBody<CourseCreateModal>,
      res: Response<CourseViewModal>
    ) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)

        return
      }

      const newCourse: CourseType = {
        studentsCount: 0,
        id: +(new Date()),
        title: req.body.title,
      }

      db.courses.push(newCourse)
      res
        .status(HTTP_STATUSES.CREATED_201)
        .json(getCourseViewModel(newCourse))
    })

    // fetch('http://localhost:3003/courses', {method: 'POST', body: JSON.stringify({title: ''}), headers: {'Content-Type': 'application/json'}})
    // .then(res => res.json())
    // .then(json => console.log(json))

    router.delete('/:id', (req: RequestWithParams<URIParamsCourseModal>, res) => {

      db.courses = db.courses.filter(c => c.id !== +req.params.id)

      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })

    // fetch('http://localhost:3003/courses/1', {method: 'DELETE'})

    router.put('/:id', (
      req: RequestWithParamsAndBody<URIParamsCourseModal, CourseUpdateModal>,
      res: Response<CourseViewModal>
    ) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)

        return
      }

      const foundCourse = db.courses.find(c => c.id === +req.params.id)

      if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

        return
      }

      foundCourse.title = req.body.title

      res.json(getCourseViewModel(foundCourse))
    })

    // fetch('http://localhost:3003/courses/1', {method: 'PUT', body: JSON.stringify({title: 'dddddddddddddddddddd'}), headers: {'Content-Type': 'application/json'}})
    // .then(res => res.json())
    // .then(json => console.log(json))

    return router
}
