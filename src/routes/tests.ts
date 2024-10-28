import express, {Express, Request, Response} from 'express'
import {CourseType} from '../db/db'
import {HTTP_STATUSES} from '../constants/constants'


export const getTestsRouter = (db: {courses: CourseType[]}) => {
    const router = express.Router();

    router.delete('/data', (req: Request, res: Response) => {
        db.courses = []
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })

    return router
}
