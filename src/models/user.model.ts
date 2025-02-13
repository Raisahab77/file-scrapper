import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

export interface UserAttributes {
    user_id: string;
    email: string;
    password: string;
    role: string;
    last_login?: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "user_id" | "last_login"> {}

export class User extends Model<UserAttributes> implements UserAttributes {
    public user_id!: string;
    public email!: string;
    public password!: string;
    public role: string;
    public last_login!: Date | null;
}

export function UserModel(sequelize: Sequelize): typeof User {
    User.init(
        {
            user_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: 'unique_email',
                    msg: 'Email must be unique',
                },
                validate: {
                    isEmail: true,
                    notEmpty: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [8, 16], // Corrected password length validation
                    is: /^[a-zA-Z0-9!@#$%^&*]{8,16}$/, // Regex validation
                },
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'user',
                validate: {
                    notEmpty: true,
                    isIn: [['admin', 'user']], // Fixed isIn validation
                },
            },
            last_login: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            timestamps: true,
            freezeTableName: true,
            tableName: 'users',
        }
    );

    return User;
}

