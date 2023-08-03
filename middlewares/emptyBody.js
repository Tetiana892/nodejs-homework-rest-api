const emptyBody = (req, res, next) => {
  if (req.body === null) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};
module.exports = emptyBody;
