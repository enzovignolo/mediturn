import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Doctor from './../models/doctorsModel.js';
import ErrorCreator from './../utils/ErrorCreator.js';

const login = async (req, res, next) => {
  try {
    //Check if the userType is corrrect
    if (
      !req.body.userType ||
      !['doctor', 'patient'].includes(req.body.userType)
    )
      throw new ErrorCreator(400, 'userType must be doctor or patient');
    //Choose a Model where it can fin the user info
    const Model = req.body.userType == 'patient' ? null : Doctor;
    const user = await Model.findOne({ email: req.body.email });
    if (!user)
      throw new ErrorCreator(
        400,
        `There is no ${req.body.userType} with that email`
      );
    //Compare passwords  
    if(await bcrypt.compare(req.body.password, user.password))
    {
      //Create signed token and sent it as response.
      const token = await jwt.sign(JSON.stringify(user)
                    ,process.env.JWT_dev);
      res.status(200).json({token});
      
    }
      
    
  } catch (err) {
    console.log(err);
    next(err);
  }
};


const isLogged = async(req,res,next)=>{
  try {
    //If there is no token in the headers, denegate access
    if(!req.headers.authorization) throw new ErrorCreator(401,'Missing token, please login.')
    //Isolate token from header that has the form Bearer <token>
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if(!(await jwt.verify(token,process.env.JWT_dev))) throw new ErrorCreator(401,'Wrong token information. Please login again!')
    next();
  } catch (err) {
    if(err.name == 'JsonWebTokenError') next(new ErrorCreator(400,`There was an error with the token : ${err.message}`));
    next(err);
    
  }

}

export default { login, isLogged };
