import { Hash } from "../services/hash";
import { RegisterUser } from "../user/application/registerUser";
import { RegisterController } from "../user/infrastructure/controllers/registerController";
import { UserRepository } from '../user/infrastructure/UserRepository';

const userRepository = new UserRepository;

const hashService = new Hash();

const registerUser = new RegisterUser(userRepository, hashService);
export const registerUserController = new RegisterController(registerUser);