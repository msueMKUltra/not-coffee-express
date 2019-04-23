const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
const Genre = mongoose.model("Genre", genreSchema);

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    genre: {
      type: genreSchema,
      required: true
    }
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(10)
      .required(),
    dailyRentalRate: Joi.number()
      .integer()
      .min(0)
      .max(10)
      .required(),
    genre: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.Genre = Genre;
module.exports.validate = validateMovie;
