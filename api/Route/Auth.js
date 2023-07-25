import express from 'express';
import { signup,signin } from '../Controller/Auths.js';

const authRoutes=express.Router();

authRoutes.post('/signup',signup);
authRoutes.post('/signin',signin);

export default authRoutes;