import { asyncHandler, ApiResponse } from "@monorepo/utils";
import { Request, Response } from "express";
import { db } from "../model/loadModel";

export const createUser = asyncHandler(async (req: Request, res: Response) => {

    try {
        const { email, userType, parentUserId, businessName } = req.body;

        if (!email) {
            return res.status(400).json(new ApiResponse(400, "Email is required", {}));
        }

        const existingUser = await db.User.findOne({ where: { email } });
      
        if (existingUser) {
            const user = await db.User.findOne({
                where: { email: email },
                attributes: ['email', 'status', 'user_type', 'createdAt', 'updatedAt', 'deletedAt'],
                include: [{
                    model: db.User,
                    as: 'parentUser',
                    attributes: ['email', 'status', 'user_type', 'createdAt', 'updatedAt', 'deletedAt']
                }],
                raw: false,
            });


            if (!user) {
                return res.status(400).json(new ApiResponse(400, '', "User not found"));
            }

            if (user.status === 'inactive') {
                return res.status(404).json(new ApiResponse(404, '', "User is inactive"));
            }
            if (user.parentUser && user.parentUser.status === 'inactive') {
                return res.status(404).json(new ApiResponse(404, '', "Parent user is inactive"));
            }
            return res.status(200).json(new ApiResponse(200, user));

        } else {

            if (parentUserId) {
                const parentUser = await db.User.findOne({
                    where: { id: parentUserId },
                    attributes: ['status'],
                    raw: true,
                });

                if (!parentUser) {
                    return res.status(404).json(new ApiResponse(404, "Parent user not found", {}));
                }

                if (parentUser.status === 'inactive') {
                    return res.status(403).json(new ApiResponse(403, "Parent user is inactive", {}));
                }
            }

            const checkBusinessName = await db.Tenant.findOne({
                where: { name: businessName }
            })

            if (!checkBusinessName) {
                const tenant = await db.Tenant.create({
                    name: businessName
                })

                const user = await db.User.create({
                    email,
                    userType,
                    parentUserId,
                    tenantId: tenant.id
                })

                return res.status(201).json(new ApiResponse(201, " User Created Successfully", user));
            } else {
                return res.status(404).json(new ApiResponse(404, "This name already exesist"));
            }

        }

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json(new ApiResponse(500, "Internal Server Error", {}));
    }
});
