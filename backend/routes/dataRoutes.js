const express=require('express')
const { addPerson,findPerson, saveSearch }=require('../controllers/dataController')
const router= express.Router();
const {requireAuth}=require('../middleware/requireAuth');

router.use(requireAuth);
router.post('/addperson',addPerson);
router.post('/findperson',findPerson);
router.post('/saverecent',saveSearch);

module.exports = router;