const jwt = require("jsonwebtoken");
//FIXME
exports.isAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "you are not authorized" });
      }
      next();
      // return res.status(200).json({ user: decoded.user });
    });
  } catch (error) {
    console.log(error);
  }
};
