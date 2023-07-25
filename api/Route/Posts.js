import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { createPost, deletePost, likeDislike, timeline, getHomeTimeline, exploreTimeline } from '../Controller/PostController.js';

const postRoutes=express.Router();

postRoutes.post('/',verifyToken,createPost);
postRoutes.delete('/delete/:id',verifyToken,deletePost);
postRoutes.put('/LD/:id',likeDislike);
postRoutes.get('/timeline/:id',verifyToken,timeline)
postRoutes.get('/homeTimeline/:id',verifyToken,getHomeTimeline)
postRoutes.get('/explore',exploreTimeline)

export default postRoutes;