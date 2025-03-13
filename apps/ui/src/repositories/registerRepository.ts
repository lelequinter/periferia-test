import { User } from "../models/User";
import api from "../utils/httpClient";

export interface RegisterResponseI {
  message: string;
  user:    User;
}

export class RegisterRepository {
  async register (name: string, email: string, password: string): Promise<RegisterResponseI> {
    const response = await api.post<RegisterResponseI>("/users/register", { name, email, password });

    return response.data
  }
}
