import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const userService = new UsersService();
    const { email } = req.body;
    try {
      const user = await userService.create({ email });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { UsersController };
