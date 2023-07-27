import express from 'express'
import { create, getAll, getDetail,remove,update } from '../controllers/product.js';
import { checkPermission } from '../middlewares/checkPermission.js';
const routerProduct = express.Router()

routerProduct.get('/', getAll);
routerProduct.get('/:id', getDetail);
routerProduct.post('/',checkPermission, create);
routerProduct.patch('/:id',checkPermission, update);
routerProduct.delete('/:id',checkPermission, remove);

export default routerProduct