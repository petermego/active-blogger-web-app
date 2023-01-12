const message = "Error 404 page not found.";

exports.getUndefiend = (req,  res) => {
  return res.status(404).json({ message });
}