//  simple calss to display error message

class errorResponse extends Error{
    constructor(message,statuscode){
        super(message),
        this.statuscode= statuscode
    }
}
module.exports = errorResponse;