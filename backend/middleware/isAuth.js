const jwt = require("jsonwebtoken");

exports.isAuth = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  try {
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      }
      if (err) return res.sendStatus(403);
      res.status(200).json({ user: decoded.user });
    });
  } catch (error) {
    console.log(error);
  }
};
