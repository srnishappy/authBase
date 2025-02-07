const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No Token' });
    }
    const verifytoken = jwt.verify(token, 'srnishappy', (err, decode) => {
      if (err) {
        return res.status(401).json({ msg: 'token is not invalid' });
      } else {
        console.log(decode);
        req.user = decode;
        next();
      }
    });
  } catch (err) {
    console.log('Something wrong in middleware');
    res.status(500).json({ msg: 'server eror' });
  }
};
