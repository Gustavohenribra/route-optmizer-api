class HttpException {
    public status: number;
  
    public message: string;
  
    public handlers: { [key: string]: unknown };
    
    public stack: string;
  
    constructor(status: number, message: string, handlers = {}, stack: string) {
      this.status = status;
      this.message = message;
      this.handlers = handlers;
      this.stack = stack;
    }
  }
  
  export default HttpException;