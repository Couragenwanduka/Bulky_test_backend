import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import errorHandling from './error/asyncError'
import router from './router/index.route'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 7000
const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/api', router)

app.use(errorHandling as express.ErrorRequestHandler)
app.listen(PORT, () => {
    console.log(`🚀 Server running at ${PORT}`)
})