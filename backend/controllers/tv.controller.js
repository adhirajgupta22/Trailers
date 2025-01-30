const {fetchfromTMDB} = require('../service/tmdb.service');

module.exports.getTrendingTv = async (req, res) => {
    try {
        const data = await fetchfromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random()*data.results?.length)];

        res.json({success:true,content:randomMovie});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log("Error in getTrendingTv controller :",error.message);
    }
}
module.exports.getTvTrailers = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({success:true,trailers:data.results});
    } catch (error) {
        if(error.message.incldes("404")){
            res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log("Error in getTvTrailers controller :",error.message);
    }
}
module.exports.getTvDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.json({success:true,content:data});
    } catch (error) {
        if(error.message.includes("404")){
            res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log("Error in getTvDetails controller :",error.message);
    }
}
module.exports.getSimilarTvs = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log("Error in getSimilarTvs controller :",error.message);
    }
}
module.exports.getTvsByCategory = async (req, res) => {
    const {category} = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log("Error in getTvsByCategory controller :",error.message);
    }
}