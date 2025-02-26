import {getRhk} from '../models/rhkModel.js';

export async function getAll(req,res){
    try{
       return await getRhk();
    }catch(error){
       console.log(error.message);
    }
}