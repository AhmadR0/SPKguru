import express from 'express';
import {login} from '../controller/loginControllers.js'
import {getAll} from '../controller/getRhkController.js'
import submitController from '../controller/submitControllers.js';

const router = express.Router();


router.post('/submit',submitController.submitData)

router.post('/login',(req,res)=>{
   login(req,res);
})

router.get('/getrhkAll',async(req,res)=>{
    const result = await getAll(req,res);
    res.status(200).json({message:"data success get",data:result});
});

router.get('/tesget',async(req,res)=>{
  logicInti();
    res.status(200).json({message:"data success get"});
});



// Endpoint untuk submit kegiatan
// router.post('/submit', submitKegiatan);

export default router;