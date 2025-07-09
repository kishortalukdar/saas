import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import client from "@monorepo/db/client";

// Extend the Request interface to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface DecodedToken extends JwtPayload {
  _id: string;
}

const isAuthenticated = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');



    if (!token) {
      return res.status(401).json(new ApiResponse(401, '', 'Unauthorized User'));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as DecodedToken;
    const user = await client.query("SELECT * FROM users WHERE id=$1",[decodedToken._id])
    // const userr = await user.findById(decodedToken._id).select('-password -refreshToken');

    if (!user) {
      return res.status(401).json(new ApiResponse(401, '', 'Invalid Access Token'));
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.log(error);

    return res.status(401).json(new ApiResponse(401, '', error?.message || 'Invalid access token'));
  }
});


// const authorizedRole = (...roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user?.role || '')) {
//       return res.status(401).json(new ApiResponse(401, '', 'Role is not allowed'));
//     }

//     next();
//   };
// };

export { isAuthenticated };
