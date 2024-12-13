//we call the cutome error class before the calling of globle error class
export class CustomError extends Error{
    statusCode;
   errors;
   constructor(status,errorMessage,errorsData={}){//errors={} means if user does not provide any value then {} assign to errors.
       super(errorMessage);//this will call the Error class constructor
       this.statusCode=status;
       this.errors=errorsData;
       Error.captureStackTrace(this,this.constructor);//it will use to track error line
   }
}