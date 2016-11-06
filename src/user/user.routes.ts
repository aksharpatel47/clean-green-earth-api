import { Router } from 'express';
import { registerUser, getUserDetail, updateUserDetail } from "./user.controllers";

const UserRoutes = Router();

UserRoutes
  .post('/', registerUser)
  .patch('/', updateUserDetail)
  .get('/:id', getUserDetail);

export default UserRoutes;