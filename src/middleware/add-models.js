const User = require('../db/models/user');
const PostedImages = require('../db/models/posted-images');//imports the posted image class


const addModels = (req, res, next) => {
  req.db = {
    User,
    PostedImages
  };
  next();
};

module.exports = addModels;
