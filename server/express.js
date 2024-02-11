import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import devBundle from './devBundle'
import path from 'path'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/',userRoutes)
app.use('/', authRoutes)

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use((err, req, res, next) => {
    const errorMessage = `error : ${err?.name} : ${err?.message}`
    if (err?.name === 'UnauthorizedError') {
        res.status(401).json(errorMessage)
    } else if (err) {
        res.status(400).json(errorMessage)
        console.log(err)
    }
})
devBundle.compile(app)

export default app