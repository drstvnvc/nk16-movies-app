import HttpService from "./HttpService";

class AuthService extends HttpService {
  async login(credentials) {
    const { data } = await this.client.post("/login", credentials);
    const token = data.token;
    localStorage.setItem("token", token);

    return data;
  }

  async register(userData) {
    const { data } = await this.client.post("/register", userData);
    const token = data.token;
    localStorage.setItem("token", token);

    return data;
  }

  async logout() {
    await this.client.post("/logout");
    localStorage.removeItem("token");
  }
}

const authService = new AuthService();
export default authService;
