let express = require('express');
import CatalogSourceCtrl from './catalog-source.controller';
let controller = new CatalogSourceCtrl();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);

router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.patch);
router.patch('/:id', auth.hasRole('admin'), controller.patch);
router.delete('/:id', auth.hasRole('admin'), controller.delete);

module.exports = router;
