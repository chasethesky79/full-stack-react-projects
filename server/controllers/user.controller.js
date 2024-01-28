import User from '../models/user.model'
import extend from 'lodash/extend'
import getErrorMessage from '../helpers/dbErrorHandler'

const create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: 'Successfully signed up!'
        })
    } catch (err) {
        return generateErrorResponse(res, err)
    }
}

const list = async (_1, res) => {
    try {
        const users = await User.find().select('name email updated created')
        return res.json(users)
    } catch (err) {
        return generateErrorResponse(res, err)
    }
}

const userByID = async (req, res, next, id) => {
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user
        next()
    } catch (err) {

    }
}

const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        return res.json(user)
    } catch (err) {
        return generateErrorResponse(err)
    }
}

const remove = async (req, res) => {
    try {
        const user = req.profile
        const deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        return res.json(deletedUser)
    } catch (err) {
        return generateErrorResponse(err)
    }
}

function generateErrorResponse(res, err) {
    return res.status(400).json({
        error: getErrorMessage(err)
    })
}

export { create, list, userByID, read, update, remove }


