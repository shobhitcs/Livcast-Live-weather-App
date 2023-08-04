const express=require('express')
const { addPerson,findPerson }=require('../controllers/dataController')
const router= express.Router();
const {requireAuth}=require('../middleware/requireAuth');

router.use(requireAuth);
router.post('/addperson',addPerson);
router.post('/findperson',findPerson);
// router.post('/createcourse',createCourse);

module.exports = router;