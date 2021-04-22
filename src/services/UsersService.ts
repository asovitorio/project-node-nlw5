import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUsersCreate {
  email: string;
}

class UsersService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }

  async findByEmail({email}:IUsersCreate){
    const user = await this.userRepository.findOne({email})
    return user
  }

  async create({ email }: IUsersCreate) {
    const userAlreadyExists = await this.userRepository.findOne({ email });

    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const user = this.userRepository.create({ email });
    await this.userRepository.save(user);

    return user;
  }
}

export { UsersService };
