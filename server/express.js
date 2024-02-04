import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/',userRoutes)
app.use('/', authRoutes)

app.use((err, req, res, next) => {
    const errorMessage = `error : ${err?.name} : ${err?.message}`
    if (err?.name === 'UnauthorizedError') {
        res.status(401).json(errorMessage)
    } else if (err) {
        res.status(400).json(errorMessage)
        console.log(err)
    }
})

export default app