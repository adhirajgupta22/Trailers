const express = require('express');
const { getSimilarTvs, getTrendingTv, getTvDetails, getTvsByCategory, getTvTrailers } = require('../controllers/tv.controller');

const router = express.Router();

router.get('/trending', getTrendingTv);
router.get('/:id/similar', getSimilarTvs);
router.get('/:id/details', getTvDetails);
router.get('/:category', getTvsByCategory);
router.get('/:id/trailers', getTvTrailers);
module.exports = router;