import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import cors from "cors"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"

// configure env
dotenv.config()
// database config
connectDB()

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//API routes
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})

