import AfloMediaController from './aflo-media.controller';
const controller = new AfloMediaController();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
var express = require('express');
var router = express.Router();

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var router = express.Router();

router.use(multiparty({ uploadDir: './uploads' }));



router.post('/', auth.isAuthenticated(), multipartyMiddleware, controller.create);

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/my', auth.isAuthenticated(), controller.my);
router.get('/:id', auth.isAuthenticated(), controller.get);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.delete);

module.exports = router;
