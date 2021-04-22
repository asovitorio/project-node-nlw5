import { Router } from "express";
import { MessageController } from "./controllers/MessageController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";


const routes = Router();

const settingsController = new SettingsController()
const userController = new UsersController()
const messageController = new MessageController()

routes.get("/settings",settingsController.index)
routes.get("/settings/:username",settingsController.findByUsername)
routes.post("/settings",settingsController.create)
routes.put("/settings/:username",settingsController.update)

routes.post('/users',userController.create)

routes.post('/messages',messageController.create)
routes.get('/messages/:user_id',messageController.showByUser)




export { routes};
