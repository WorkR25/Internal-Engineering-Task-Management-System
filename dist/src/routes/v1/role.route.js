import { Router } from 'express';
import { RoleController } from '../../controllers/role.controller.js';
const roleRouter = Router();
const roleController = new RoleController();
roleRouter.post('/', roleController.create.bind(roleController));
roleRouter.get('/', roleController.findAll.bind(roleController));
roleRouter.get('/:id', roleController.find.bind(roleController));
roleRouter.put('/:id', roleController.update.bind(roleController));
roleRouter.delete('/:id', roleController.delete.bind(roleController));
export default roleRouter;
//# sourceMappingURL=role.route.js.map