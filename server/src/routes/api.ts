import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import User from '@src/models/User';
import Url from '@src/models/Url';
import UserRoutes from './UserRoutes';
import UrlRoutes from './UrlRoutes';

const apiRouter = Router(),
  validate = jetValidator();

const userRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.isUser]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.isUser]),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// ** Add UrlRouter ** //

const urlRouter = Router();

// Get all urls
urlRouter.get(
  Paths.Urls.Get,
  UrlRoutes.getAll,
);

// Add one urlurlRouter
urlRouter.post(
  Paths.Urls.Add,
  validate(['url', 'object'],['url', Url.isUrl]),
  UrlRoutes.add,
);

// Delete one url
urlRouter.delete(
  Paths.Urls.Delete,
  validate(['id', 'number', 'params']),
  UrlRoutes.delete,
);


// Add UrlRouter
apiRouter.use(Paths.Urls.Base, urlRouter);

const tinyUrlRouter = Router();
tinyUrlRouter.get(
  Paths.TinyUrl.Get,
  validate(['id', 'string', 'params']),
  UrlRoutes.getFromTinyUrl,
);

apiRouter.use(Paths.TinyUrl.Base, tinyUrlRouter);

// **** Export default **** //

export default apiRouter;
