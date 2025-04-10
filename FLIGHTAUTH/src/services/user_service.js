const UserRepository = require("../repository/user_repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverconfig");
const bcrypt = require("bcrypt");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getbyEmail(email);
      const passwordsMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordsMatch) {
        console.log("Passwords don't match");
        throw { error: "Incorrect Password" };
      } else {
        const newJWT = this.createToken({ email: user.email, id: user.id });
        return newJWT;
      }
    } catch (error) {
      console.log("Something wrong happened in signing in");
      throw error;
    }
  }
  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid Token" };
      }
      const user = await this.userRepository.getbyId(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Sommething wrong happened in auth process");
      throw error;
    }
  }
  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "10h" });
      return result;
    } catch (error) {
      console.log("Something wrong happened in token creation");
      throw error;
    }
  }
  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something wrong happened in token validation");
      throw error;
    }
  }
  checkPassword(userInputPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
  isAdmin(userId){
    try{
        return this.userRepository.isAdmin(userId)
    }catch(error){
        console.log("Something wrong happened in admin verification")
        throw error
    }
  }
}
module.exports = UserService;
