import express from 'express'
import { create, list, read, userByID, update, remove } from '../controllers/user.controller'
import { requireSignin, hasAuthorization } from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
    .get(list)
    .post(create)

router.param('userId', userByID)
router.route('/api/users/:userId')
.get(requireSignin, read)
.put(requireSignin, hasAuthorization, update)
.delete(requireSignin, hasAuthorization, remove)

export default router
