const handleMulterError = (err, req, res, next) => {
  console.log(req.file);
  if (err) return res.status(400).json({ message: "File Format Error", err });
  next();
};

module.exports = handleMulterError;
