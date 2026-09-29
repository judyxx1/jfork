import Rating from '../models/Ratings.js';

export const createRating = async (req, res, next) => {
  try {
    const rating = await Rating.create(req.body);
    res.status(201).json({ rating });
  } catch (err) {
    next(err);
  }
};

export const getAllRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.find();
    res.status(200).json({ ratings });
  } catch (err) {
    next(err);
  }
};

export const getRating = async (req, res, next) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.status(200).json({ rating });
  } catch (err) {
    next(err);
  }
};

export const getRatingSummary = async (req, res, next) => {
  try {
    const ratings = await Rating.find();
    const summary = ratings.reduce((acc, rating) => {
      acc[rating.movieCode] = acc[rating.movieCode] || { totalRating: 0, count: 0 };
      acc[rating.movieCode].totalRating += rating.rating;
      acc[rating.movieCode].count += 1;
      return acc;
    }, {});

    const result = Object.entries(summary).map(([movieCode, data]) => ({
      movieCode,
      averageRating: data.totalRating / data.count,
      count: data.count,
    }));

    res.status(200).json({ summary: result });
  } catch (err) {
    next(err);
  }
};
