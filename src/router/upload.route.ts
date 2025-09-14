import express from 'express';
import { uploadImage } from '../controller/upload.Controller';
import { upload } from '../utils/mutler';
import { authenticateUserToken } from '../middleware/validatorusertoken';

const uploadRouter = express.Router();

// Protect routes with auth middleware
uploadRouter.use(authenticateUserToken);

// Upload profile picture(s) for authenticated user
uploadRouter.post('/', upload.array('image', 10), uploadImage);

export default uploadRouter;