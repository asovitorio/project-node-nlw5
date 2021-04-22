import { EntityRepository, Repository } from "typeorm";
import { Messages } from "../entities/Messages";


@EntityRepository(Messages)
class MessageRepository extends Repository<Messages> {}

export {MessageRepository}