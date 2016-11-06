import { Router } from 'express';
import {
  getOpporunities,
  getOpportunityDetails,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
} from './opportunities.controllers';

const OpportunitiesRoutes = Router();

OpportunitiesRoutes
  .get('/', getOpporunities)
  .get('/:id', getOpportunityDetails)
  .post('/', createOpportunity)
  .put('/:id', updateOpportunity)
  .delete('/:id', deleteOpportunity);

export default OpportunitiesRoutes;