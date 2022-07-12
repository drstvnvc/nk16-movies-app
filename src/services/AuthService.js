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
    localStorage.removeItem("token");
    await this.client.post("/logout");
  }

  async getActiveUser() {
    const { data } = await this.client.get("/profile");
    return data;
  }
}

const authService = new AuthService();
export default authService;
