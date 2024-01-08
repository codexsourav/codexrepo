import { Response, Router } from 'express';
import middleware from '../../middleware/middleware.js';
import { AuthRequest } from 'src/interfaces/AuthRequest.js';
const router: Router = Router();

router.get("/api/files", middleware, async (req: AuthRequest, res: Response) => { });

