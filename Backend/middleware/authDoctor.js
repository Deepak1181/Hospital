import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
  try {
    const authDoctorHeader = req.header('Authorization'); 
    if (!authDoctorHeader || !authDoctorHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const token = authDoctorHeader.split(' ')[1]; // Extract token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); 

    req.docId = token_decode.id; // Attach user ID
    next();
  } catch (error) {
    console.log('Auth Error:', error);
    res.status(401).json({ success: false, message: 'Invalid Token' });
  }
};

export default authDoctor;
