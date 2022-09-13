const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllThings);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.put('/:id', auth, stuffCtrl.updateThing);

module.exports = router;