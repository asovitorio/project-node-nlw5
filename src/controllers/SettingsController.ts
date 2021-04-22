import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
  async index(req: Request, res: Response) {
    try {
      const settingsService = new SettingsService();
      const settings = await settingsService.index();
      return res.status(200).json(settings);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { username, chat } = req.body;
      const settingsService = new SettingsService();

      const settings = await settingsService.create({ username, chat });
      return res.status(201).json(settings);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findByUsername(req: Request, res: Response){
    try {
      const {username} = req.params
      
      
      const settingsService = new SettingsService();
      const settings = await settingsService.findByUsername(username)
     
      return res.status(200).json(settings)
      
    } catch (error) {
      return res.status(400).json(error)
      
    }
  }
  async update(req: Request, res: Response){
    try {
      const {username} = req.params
      const {chat} = req.body
      
      
      const settingsService = new SettingsService();
      const settings = await settingsService.update(username,chat)
     
      return res.status(200).json(settings)
      
    } catch (error) {
      return res.status(400).json(error)
      
    }
  }
  
}

export { SettingsController };
