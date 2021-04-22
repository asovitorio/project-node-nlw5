import { getCustomRepository, Repository } from "typeorm";
import { MessageRepository } from "../repositories/MessageRepository";
import { Messages } from "../entities/Messages";

interface IMessageCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessagesService {

    private messageRepository : Repository<Messages>

    constructor(){
        this.messageRepository = getCustomRepository(MessageRepository);
    }

  async listById(user_id: string) {

    const list = await this.messageRepository.find({ 
        where:{user_id},
        relations:['user']
    });

    return list
  }

  async create({ admin_id, text, user_id }: IMessageCreate) {
  
    const message = this.messageRepository.create({
      admin_id,
      text,
      user_id,
    });
    await this.messageRepository.save(message);
    return message;
  }
}

export { MessagesService };
