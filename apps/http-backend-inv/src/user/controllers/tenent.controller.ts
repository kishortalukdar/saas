import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiResponse";
import client from "@monorepo/db/client";
import { CookieOptions } from "express";
import { generateToken } from "../../utils/generateToken";

export const tenentCreate = asyncHandler(async (req: Request, res: Response) => {

    const {compnayName , gstNo} = req.body

    try {

        

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, "", "Server Error"));
    }
})