import express from 'express'
import { db } from '../src/db/db'
import { getBaseRouter } from '../src/routes/base'
import { getTestsRouter } from './routes/tests'
import { getCoursesRouter } from '../src/routes/courses'

export const app = express()

const jsonBodyMiddleWare = express.json()

app.use(jsonBodyMiddleWare)

app.use('/', getBaseRouter())
app.use('/courses', getCoursesRouter())
app.use('/__tests__', getTestsRouter(db))
