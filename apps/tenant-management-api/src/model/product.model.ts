import { Model, DataTypes, Sequelize } from "sequelize";

interface ProductAttributes {
  id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Product extends Model<ProductAttributes> {
  
  static associate(models: any) {
    Product.hasMany(models.Order, {
      foreignKey: 'productId',
      as: 'orders'
    });
  }

  static initModel(sequelize: Sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "products",
        modelName: "Product",
      }
    );
  }
}
