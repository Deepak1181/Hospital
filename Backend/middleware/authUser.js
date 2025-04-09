import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization'); 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const token = authHeader.split(' ')[1]; // Extract token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    req.userId = token_decode.id; // Attach user ID
    next();
  } catch (error) {
    console.log('Auth Error:', error);
    res.status(401).json({ success: false, message: 'Invalid Token' });
  }
};

export default authUser;
