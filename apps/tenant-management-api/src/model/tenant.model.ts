import { Model, DataTypes, Sequelize } from "sequelize";

interface TenantAttributes {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export default class Tenant extends Model<TenantAttributes> {
    static associate(models: any) {
        Tenant.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
        
    }

    static initModel(sequelize: Sequelize) {
        Tenant.init(
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
                    defaultValue: "XYZ Ltd",
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: "Tenant",
                tableName: "tenants",
                timestamps: true,
                paranoid: true, 
            }
        );
    }
}