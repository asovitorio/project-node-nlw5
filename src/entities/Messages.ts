import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import {v4 as uuid} from 'uuid'
@Entity("messages")
class Messages {

  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;
  
  @Column()
  text:string

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export {Messages}