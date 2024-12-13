//pass 4 argument to make the middilware as the global error handler .the first argument always be the error
export const globalErrorHandler=(err,req,res,next)=>{
    //this error is going to recive the error Object.express app automatically recognize it as a global error handler.
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        statusCode,
        message,
        data: null,
        errors: err.errors || {},  // Pass any additional error details if available
      });

}