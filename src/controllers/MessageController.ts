import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";
class MessageController {

  async showByUser(req: Request, res: Response){
    const messageService = new MessagesService();
    try {
        const {user_id} = req.params
        
        
       const list = await messageService.listById(user_id)


       return res.status(200).json(list)
       
    } catch (error) {
        
        return res.status(400).json(error)
    }

  }  

  async create(req: Request, res: Response): Promise<Response> {
    const messageService = new MessagesService();
    try {
      const { admin_id, text, user_id } = req.body;
      const message = await messageService.create({ admin_id, text, user_id });
      return res.status(201).json(message);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export { MessageController };
