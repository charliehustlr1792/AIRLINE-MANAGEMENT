const {StatusCodes}=require('http-status-codes')
class ValidationError extends Error{
    constructor(error)
    {
        let explanation=[]
        error.errors.array.forEach((err) => {
            explanation.push(err.message)
        });
        this.name='Validation Error'
        this.message='Not able to validate the data sent in the request',
        this.explanation=explanation,
        this.statusCode=StatusCodes.BAD_REQUEST
    }
}
module.exports=ValidationError