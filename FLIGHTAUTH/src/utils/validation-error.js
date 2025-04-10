const AppEror=require('./error-handler')
const {StatusCodes}=require('http-status-codes')
class ValidationError extends AppError{
    constuctor(error){
        let errorName=error.name;
        let explanation=[];
        error.errors.forEach((err) => {
            explanation.push(err.message)
        });

        super(
            errorName,
            'Not able to validate the data sent in the request',
            explanation,
            StatusCodes.BAD_REQUEST
        )
    }

}
module.exports=ValidationError