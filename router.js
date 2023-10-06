const AddData = require('./controllers/AddData');

const router=require('express').Router();

router.get('/add_data',AddData.addData)
router.post('/getData',AddData.getData)
router.get('/getAlldata',AddData.getAllData)
router.post('/download',AddData.download)
router.get('/',(req,res)=>res.send("running"))

module.exports=router;