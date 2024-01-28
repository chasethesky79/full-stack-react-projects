import express from 'express'
import { create, list } from '../controllers/user.controller'

const router = express.Router()

router.route('/api/users')
    .get(list)
    .post(create)


export default router
