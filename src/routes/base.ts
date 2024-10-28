import express from 'express'

export const getBaseRouter = () => {
    const router = express.Router();

    router.get('/', (req: any, res: any) => {
        const a = 4
        if (a > 5 ) {
          res.send({message: 'Hello World!55555555'})
        } else {
          res.send({message: 'Hello World!44444444'})
        }
    })

    return router
}