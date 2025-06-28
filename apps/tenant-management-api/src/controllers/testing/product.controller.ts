import { asyncHandler, ApiResponse } from "@monorepo/utils";
import { Request, Response } from "express";
import { db } from "../../model/loadModel";
import { Sequelize,Op } from 'sequelize'; 


export const createProduct = asyncHandler(async (req: Request, res: Response) => {

    try {

        const productName = await db.Product.findOne({ where: { name: req.body.name } })

        if (productName) {
            return res.status(400).json(new ApiResponse(400, '', "Product name is avaliable"));
        }

        const product = await db.Product.create(
            req.body
        )
        if (!product) {
            return res.status(400).json(new ApiResponse(400, "Something is happen"));
        }
        return res.status(200).json(new ApiResponse(200, "Product is create a sucessfully"));


    } catch (error) {

    }
})

export const productList = asyncHandler(async (req: Request, res: Response) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page  as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const offset = (page - 1) * limit;

    const { count: totalItems, rows: data } = await db.Product.findAndCountAll({
        include: [
            {
              model: db.Order, 
              as: 'orders'   
            }
          ],
        // where: {
        //     price: {
        //         [Op.gt]: 5000 
        //     }
        // },
        // attributes: [
        //     'price',
        //     [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalProducts'],

        // ],
        // group: ['price'],

        order: [['price', 'ASC']],
        limit,
        offset
    });
    
    const totalPages = Math.ceil(
      Array.isArray(totalItems) ? totalItems.length / limit : totalItems / limit
    );

    return res.status(200).json(new ApiResponse(200, {
      totalItems: Array.isArray(totalItems) ? totalItems.length : totalItems,
      totalPages,
      currentPage: page,
      data
    }));

  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
});

  