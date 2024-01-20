import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import cors from "cors"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import cookieParser from 'cookie-parser';
import path from "path"

// configure env
dotenv.config()
// database config
connectDB()

const __dirname = path.resolve()

const app = express()
app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client','dist','index.html'))
})

// middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(morgan('dev'))


//API routes
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

// middleware
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "internal server error"
    return(res.status(statusCode).json({
        success:false,
        message,
        statusCode
    }))
})

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})

