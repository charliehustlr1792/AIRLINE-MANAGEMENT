const express=require('express')
const UserController=require('../../controllers/user_controller')
const AuthRequestValidatorsMiddleware=require('../../middlewares/auth_request_validators')
const router=express.Router()
router.post(
    '/signup',
    AuthRequestValidatorsMiddleware.validateUserAuth,
    UserController.create
)
router.post(
    '/signin',
    AuthRequestValidatorsMiddleware.validateUserAuth,
    UserController.signIn
)
router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
)
router.get(
    '/isAdmin',
    AuthRequestValidatorsMiddleware.validateIsAdminRequest,
    UserController.isAdmin
)
module.exports=router;