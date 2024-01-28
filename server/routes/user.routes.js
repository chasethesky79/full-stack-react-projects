import express from 'express'
import { create, list, read, userByID, update, remove } from '../controllers/user.controller'

const router = express.Router()

router.route('/api/users')
    .get(list)
    .post(create)

router.param('userId', userByID)
router.route('/api/users/:userId').get(read)
router.route('/api/users/:userId').put(update)
router.route('/api/users/:userId').delete(remove)

export default router
