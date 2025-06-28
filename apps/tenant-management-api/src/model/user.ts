import { Model, DataTypes, Sequelize } from "sequelize";

interface UserAttributes {
    id: string;
    email: string;
    status: 'active' | 'inactive';
    userType: 'primary' | 'general';
    parentUserId?: string | null;
    tenantId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export default class User extends Model<UserAttributes> {
    static associate(models: any) {
        User.belongsTo(models.User, {
            foreignKey: 'parent_user_id',
            as: 'parentUser',
        });
        User.hasOne(models.Tenant, {
            foreignKey: "user_id",
            as: "tenant",
        });
    }

    static initModel(sequelize: Sequelize) {
        User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: { isEmail: true },
                },
                status: {
                    type: DataTypes.ENUM('active', 'inactive'),
                    allowNull: false,
                    defaultValue: 'active',
                },
                userType: {
                    type: DataTypes.ENUM('primary', 'general'),
                    allowNull: false,
                    defaultValue: 'primary',
                },
                parentUserId: {
                    type: DataTypes.UUID,
                    allowNull: true,
                    references: { model: 'users', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                tenantId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: { model: 'tenants', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
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
                tableName: "users",
                timestamps: true,
                // paranoid: true,
                modelName: "User",
            }
        );
    }
}
