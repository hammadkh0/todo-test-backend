const request = require("supertest");
const app = require("../server"); // Assuming your server file is named 'server.js'
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

describe("User Controller", () => {
  describe("signup", () => {
    it("should create a new user", async () => {
      const response = await request(app).post("/api/v1/users/signup").send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        image: "avatar.jpg",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("status", "success");
      expect(response.body).toHaveProperty("name", "John Doe");
      expect(response.body).toHaveProperty("image", "avatar.jpg");
      expect(response.body).toHaveProperty("token");
    });
  });

  describe("login", () => {
    it("should authenticate the user with correct credentials", async () => {
      // Create a user with a known password
      const hashedPassword = await bcrypt.hash("password123", 12);
      const user = new User({
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        image: "avatar.jpg",
      });
      await user.save();

      const response = await request(app).post("/api/v1/users/login").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("status", "success");
      expect(response.body).toHaveProperty("name", "John Doe");
      expect(response.body).toHaveProperty("image", "avatar.jpg");
      expect(response.body).toHaveProperty("token");
    });

    it("should return an error for incorrect password", async () => {
      // Create a user with a known password
      const hashedPassword = await bcrypt.hash("password123", 12);
      const user = new User({
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        image: "avatar.jpg",
      });
      await user.save();

      const response = await request(app).post("/api/v1/users/login").send({
        email: "john@example.com",
        password: "incorrectpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("status", "fail");
      expect(response.body).toHaveProperty("message", "Incorrect password");
    });
  });
});
