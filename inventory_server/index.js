const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./app/Router/web/userRouter');
const cors = require('cors');
const { productRoute } = require('./app/Router/web/productRouter');
require('dotenv').config();

const app = express();
app.use(cors())

// Optional: Use express.json() to handle JSON bodies
app.use(express.json());

app.use('/api/inventory',userRouter)
app.use('/api/inventory',productRoute)

mongoose.connect(process.env.DBURL)
.then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT , () => {
        console.log(`🚀 Server running on port ${process.env.PORT }`);
    });
})
.catch((err) => {
    console.error("❌ DB connection error:", err.message);
});
