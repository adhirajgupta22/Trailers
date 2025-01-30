const {fetchfromTMDB} = require('../service/tmdb.service');

module.exports.getTrendingMovie = async (req,res)=>{
    try {
        const data = await fetchfromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        //console.log(data);
        const randomMovie = data.results[Math.floor(Math.random()*data.results?.length)];

        res.json({success:true,content:randomMovie});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log("Error in getTrendingMovie controller",error.message);
    }
}
module.exports.getMovieTrailers = async (req,res)=>{
    const {id} = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.json({success:true,trailers:data.results});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log("Error in getMovieTrailers controller",error.message);
    }
}
module.exports.getMovieDetails = async (req,res)=>{
    const {id} = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.json({success:true,content:data});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log("Error in getMovieDetails controller",error.message);
    }
}
module.exports.getSimilarMovies = async (req,res)=>{
    const {id} = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log("Error in getSimilarMovies controller",error.message);
    }
}
module.exports.getMoviesByCategory = async (req,res)=>{
    const {category} = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log("Error in getMoviesByCategory controller",error.message);
    }
}