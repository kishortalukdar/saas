import { Model, DataTypes, Sequelize } from "sequelize";

interface OrderAttributes {
  id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  orderDate: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Order extends Model<OrderAttributes> {

  static associate(models: any) {        
    Order.belongsTo(models.Product, { 
      foreignKey: 'productId', 
      as: 'products' 
    }); 
  }

  static initModel(sequelize: Sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "products", 
            key: "id"
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        totalPrice: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        orderDate: {
          type: DataTypes.STRING,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }
      },
      {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        timestamps: true
      }
    );
  }
}
