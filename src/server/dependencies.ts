import { Hash } from "../services/hash";
import { JWT } from "../services/jwt";
import { LoginUser } from "../user/application/loginUser";
import { RegisterUser } from "../user/application/registerUser";
import { LoginController } from "../user/infrastructure/controllers/loginController";
import { RegisterController } from "../user/infrastructure/controllers/registerController";
import { UserRepository } from '../user/infrastructure/UserRepository';

const userRepository = new UserRepository;

const hashService = new Hash();
const jwtService = new JWT();

const registerUser = new RegisterUser(userRepository, hashService);
export const registerUserController = new RegisterController(registerUser);

const loginUser = new LoginUser(userRepository, hashService, jwtService);
export const loginController = new LoginController(loginUser);