/**
 * Handle error when the mail
 * is already in use
 */
const duplicatedError = (err)=> {
    err.statusCode = 400;
    err.msg=`Email ${err.keyValue.email} is already in use!`
    return err
}

const validationError = (err)=>{
    err.statusCode = 400;
    err.msg=err.message;
    return err;
}

const errorHandler = (err,req,res,next)=>{
    console.log(err.name)
    //Check if error has a code=11000 is a duplicated key error
    if(err.code==11000) err=duplicatedError(err);
    if(err.name=="ValidationError") err=validationError(err);
    
    /*Here we send the error, if our error has not status
     or message, we use default values */
    res.status(err.statusCode || 500).json({ERROR:err.msg || "Oops! There was an error with that request"});
}


module.exports = errorHandler;