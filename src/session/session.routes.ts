import { Router } from 'express';

const SessionRoutes = Router();

SessionRoutes
  .post('/:email', (req, res) => res.sendStatus(200))
  .delete('/:email', (req, res) => res.sendStatus(200));

export default SessionRoutes;