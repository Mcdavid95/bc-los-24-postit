import jwt from 'jsonwebtoken';

module.exports = {
  authorize(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
          console.error('JWT Verification Error', err);
          return res.status(403).send(err);
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      res.status(403).send('Token not provided');
    }
  }
};
