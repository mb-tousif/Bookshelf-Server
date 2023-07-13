import express from 'express';
import { userRoutes } from '../Modules/Users/user.routes';
import { bookRoutes } from '../Modules/Books/book.routes';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/books',
        route: bookRoutes
    }
];

moduleRoutes.forEach((route) => { 
    router.use(route.path, route.route);
});

export default router;