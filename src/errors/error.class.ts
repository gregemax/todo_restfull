class errorclass extends Error {
  
    status: any;
  constructor(message:any, status:any) {
    super(message||"some error occurred");
    this.status = status|| 300;
   
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = errorclass
