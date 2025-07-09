import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiResponse";
import client from "@monorepo/db/client";
import { CookieOptions } from "express";
import { generateToken } from "../../utils/generateToken";

export const siginIn = asyncHandler(async (req: Request, res: Response) => {
    const { email, phoneNo } = req.body;

    try {
        if (!email || !phoneNo) {
            return res.status(400).json(
                new ApiResponse(400, "", "email and phoneNo is required.")
            );
        }

        // Fetch user
        const result = await client.query(
            `SELECT * FROM "User" WHERE email = $1 AND "phoneNo" = $2`,
            [email, phoneNo]
        );

        let user = result.rows[0];


        // If user does not exist, create it
        if (!user) {
            const insertResult = await client.query(
                `INSERT INTO "User" (email, "phoneNo")
                VALUES ($1, $2)
                RETURNING *`,
                [email, phoneNo]
            );
            user = insertResult.rows[0];
        }
       
        const token = generateToken(user.id);

        const options: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        };

        return res
            .status(200)
            .cookie("accessToken", token, options)
            .json(new ApiResponse(200, { user, token }, "Signed in successfully"));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, "", "Server Error"));
    }
});
