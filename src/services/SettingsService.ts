import { Settings } from "../entities/Settings";
import { getCustomRepository, Repository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  username: string;
  chat: boolean;
}

class SettingsService {

  private settingsRepository: Repository<Settings>

  constructor(){
   this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async index() {
  
    const settings = await this.settingsRepository.find();
    return settings;
  }

  async create({ chat, username }: ISettingsCreate) {
   
    const userAlreadyExists = await this.settingsRepository.findOne({ username });
 
    if (userAlreadyExists) {
      throw new Error("User already exist!");
   
    }

    const settings = this.settingsRepository.create({
      username,
      chat,
    });
    await this.settingsRepository.save(settings);
    return settings;
  }

  async findByUsername(username:string){
  
    const settings = await this.settingsRepository.findOne({username});
    return settings;
  }

  async update(username:string, chat:boolean){
    const settings = await this.settingsRepository.findOne({username})
    settings.chat=chat
    await this.settingsRepository.save(settings)
    return settings
  }
}

export { SettingsService };
