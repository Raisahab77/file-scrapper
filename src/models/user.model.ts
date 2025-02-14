import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

export interface UserAttributes {
    user_id: string;
    name:string;
    email: string;
    password: string;
    role: string;
    last_login?: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "user_id" | "last_login"> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: string;
    public name!: string;
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
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'Name is required' },
                    len: { args: [3, 50], msg: 'Name must be between 3 and 50 characters in length' },
                },
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
                    notEmpty: {
                        msg: 'Password is required',
                    },
                    len: {
                        args: [8, 16],
                        msg: 'Password must be between 8 and 16 characters long',
                    }, // Corrected password length validation
                    is: {
                        args: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/],
                        msg: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                    },
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

