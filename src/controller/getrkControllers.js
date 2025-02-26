import {getResultrhk} from '../models/getRhkModels.js';

export async function resultGet(userid){
    try{
       return await getResultrhk(userid);
    }catch(error){
       console.log(error.message);
    }
}