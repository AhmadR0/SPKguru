import {getUser} from "../models/loginModels.js";

export async function login(req,res){
 console.log(req.body);
 const {username,password} = req.body;
    try{
        const user = await getUser(username,password);
        if(user){
            if(user.password !== password && user.username !== username){
                res.status(401).json({message:"Password & Username not match"});
            }
            
        }else{
            res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"Login success",data:user});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}


