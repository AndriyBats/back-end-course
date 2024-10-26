import request from 'supertest'
import { app } from '../../src/index'
import { HTTP_STATUSES } from '../../src/index'

import { CourseCreateModal } from '../../src/models/CreateCourseModel'
import { CourseUpdateModal } from '../../src/models/UpdataCourseModel'

describe('/course', () => {
    beforeAll(async () => {
        await request(app)
          .delete('/__tests__/data')
    })

    it('should return message', async () => {
        await request(app)
          .get('/')
          .expect({message: 'Hello World!44444444'})
    })

    it('should return 200 and empty array', async () => {
        await request(app)
          .get('/courses')
          .expect(HTTP_STATUSES.OK_200, [])
    })

    it('should return not existing course', async () => {
        await request(app)
          .get('/courses/1')
          .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('shouldn"t create course with incorect data', async () => {
        const data: CourseCreateModal = {title: ''}

        await request(app)
          .post('/courses')
          .send(data)
          .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
          .get('/courses')
          .expect(HTTP_STATUSES.OK_200, [])
    })

    let createdCourse1: any = null
    let createdCourse2: any = null

    it('should create course with corect data', async () => {
        const data: CourseCreateModal = {title: 'Course 1'}

        const createResponse = await request(app)
          .post('/courses')
          .send(data)
          .expect(HTTP_STATUSES.CREATED_201)

        createdCourse1 = createResponse.body

        expect(createdCourse1).toEqual({
            title: data.title,
            id: expect.any(Number)
        })

        await request(app)
          .get('/courses')
          .expect([createdCourse1])
    })

    it('should create other course with corect data', async () => {

        const data: CourseCreateModal = {title: 'Course 3'}

        const createResponse = await request(app)
          .post('/courses')
          .send(data)
          .expect(HTTP_STATUSES.CREATED_201)

        createdCourse2 = createResponse.body

        expect(createdCourse2).toEqual({
            title: data.title,
            id: expect.any(Number)
        })

        await request(app)
          .get('/courses')
          .expect([createdCourse1, createdCourse2])
    })

    it('shouldn"t updata course with incorect data', async () => {
        const data: CourseUpdateModal = {title: ''}

        await request(app)
          .put('/courses/' + createdCourse1.id)
          .send(data)
          .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
          .get('/courses')
          .expect([createdCourse1, createdCourse2])
    })

    it('shouldn"t updata course with incorect id', async () => {
        const data: CourseUpdateModal = {title: 'Course 2'}

        await request(app)
          .put('/courses/100')
          .send(data)
          .expect(HTTP_STATUSES.NOT_FOUND_404)

        await request(app)
          .get('/courses/' + createdCourse1.id)
          .expect(createdCourse1)
    })

    it('should updata course with corect data', async () => {
        const data: CourseUpdateModal = {title: 'Course 2'}

        await request(app)
          .put('/courses/' + createdCourse1.id)
          .send(data)
          .expect({
            id: createdCourse1.id,
            title: data.title,
          })

        await request(app)
          .get('/courses/' + createdCourse1.id)
          .expect({
            id: createdCourse1.id,
            title: data.title,
        })
    })

    it('should delete both courses', async () => {
        await request(app)
          .delete('/courses/' + createdCourse1.id)
          .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
          .delete('/courses/' + createdCourse1.id)
          .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
          .delete('/courses/' + createdCourse2.id)
          .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
          .delete('/courses/' + createdCourse2.id)
          .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
          .get('/courses')
          .expect([])
    })
})