const express  = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth.route');
const movieRoutes = require('./routes/movie.route');
const tvRoutes = require('./routes/tv.route');
const searchRoutes = require('./routes/search.route');

const {connectDB} = require('./config/db.config');
const {protectRoute} = require('./middlewares/protectRoutes');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute,movieRoutes);
app.use("/api/v1/tv",protectRoute,tvRoutes);
app.use("/api/v1/search",protectRoute,searchRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(_dirname,'/frontend/dist')));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,'frontend','dist','index.html'));
    });
}

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});