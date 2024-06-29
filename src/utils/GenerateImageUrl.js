module.exports = function GenerateImageUrl(req, imagePath) {
  return `${req.protocol}://${req.get("host")}/uploads/${imagePath}`;
};
