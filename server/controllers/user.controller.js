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

function generateErrorResponse(res, err) {
    return res.status(400).json({
        error: getErrorMessage(err)
    })
}

export { create, list }


