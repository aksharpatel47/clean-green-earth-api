import { Router } from 'express';
import { registerUser, getUserDetail, updateUserDetail, verifyEmail } from "./user.controllers";

const UserRoutes = Router();

UserRoutes
  .post('/', registerUser)
  .put('/:email', verifyEmail)
  .patch('/', updateUserDetail)
  .get('/:id', getUserDetail);

export default UserRoutes;