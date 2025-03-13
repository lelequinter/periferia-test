import { User } from "../models/User";
import api from "../utils/httpClient";

export interface LoginResponseI {
  message: string;
  user:    User;
}

export class LoginRepository {
  async login (email: string, password: string): Promise<LoginResponseI> {
    const response = await api.post<LoginResponseI>("/users/login", { email, password });

    return response.data
  }
}
