import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";

interface IParams {
    text:string;
    email:string;
}

io.on("connect", (socket) => {
  socket.on("client_first_access", async (params) => {
    const connectionsService = new ConnectionsService();
    const userService = new UsersService();
    const messageService = new MessagesService()
    const socket_id = socket.id;

    const { email, text } = params as IParams;
    let user_id = null
    const userExist = await userService.findByEmail({ email });

    if (!userExist) {
      const user = await userService.create({ email });
      user_id = user.id;
      await connectionsService.create({
        socket_id,
        user_id
      });
    } else {
      const connection = await connectionsService.findByUserId(userExist.id);
      user_id = userExist.id  
      if (!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userExist.id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionsService.create(connection);
      }
    }

    await messageService.create({text,user_id})
    
  });
});
