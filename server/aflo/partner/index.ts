let express = require('express');
import PartnerCtrl from './partner.controller';
let controller = new PartnerCtrl();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.get('/deep/:id', controller.showDeep);

router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.patch);
router.patch('/:id', auth.hasRole('admin'), controller.patch);
router.delete('/:id', auth.hasRole('admin'), controller.delete);

module.exports = router;
