import { Model, DataTypes, Sequelize } from "sequelize";

interface UserAttributes { 
    id: string;
    email: string;
    status: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export class User extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public email!: string;
    public status!: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date | null;

    static associate(models: any) {
        // Define associations here
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
                    validate: {
                        isEmail: true,
                    },
                },
                status: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
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
                tableName: "user",
                timestamps: true,
                paranoid: true,
                modelName: "User",
            }
        );
    }
}
