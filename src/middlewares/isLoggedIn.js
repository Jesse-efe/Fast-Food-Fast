import jwt from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.userSecretKey);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Auth failed' });
  }
};

export default isLoggedIn;
