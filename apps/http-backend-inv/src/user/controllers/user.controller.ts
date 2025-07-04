
import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler"
import { ApiResponse } from "../../utils/apiResponse"
import client from "@monorepo/db/client";

export const siginIn =  asyncHandler(async(req:Request,res:Response)=>{
    const {email,}  = req.body
    try {

        // create a tenent 
        // create a user 
        // login user

      


        
    } catch (error) {
        
    }
})