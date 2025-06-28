import { asyncHandler, ApiResponse } from "@monorepo/utils";
import { Request, Response } from "express";
import { db } from "../../model/loadModel";


export const createOrder = asyncHandler(async (req : Request,res : Response)=>{
    try {

        const orderCreate = await db.Order.create(req.body)
        return res.status(200).json(new ApiResponse(200,orderCreate));


    } catch (error) {
        return res.status(500).json(new ApiResponse(500, "Internal Server Error"));

    }
})

export const getAllOrders = asyncHandler(async (req : Request,res : Response)=>{

    try {

        const getAllOrders = await db.Order.findAll(
           {
            include: [
                {
                  model: db.Product, 
                  as: 'products'   
                }
              ],
           }
        )
        return res.status(200).json(new ApiResponse(200,getAllOrders));
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json(new ApiResponse(500, "Internal Server Error",error));

    }
})