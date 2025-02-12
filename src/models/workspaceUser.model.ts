import { Model, DataTypes, Sequelize } from 'sequelize';

export interface WorkspaceUserAttributes {
    workspace_user_id:string;
    user_id: string;
    workspace_id:string;
}

export class WorkspaceUser extends Model<WorkspaceUserAttributes> implements WorkspaceUserAttributes {
    public workspace_user_id!: string;
    public user_id!: string;
    public workspace_id!: string;
}

export function WorkspaceUserModel(sequelize: Sequelize): typeof WorkspaceUser {
    WorkspaceUser.init(
        {
            workspace_user_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id',
                },
            },
            workspace_id: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'workspaces',
                    key: 'workspace_id',
                }
            },
        },
        {
            sequelize,
            timestamps: true,
            freezeTableName: true,
            tableName: 'workspace_users',
            indexes: [
                {
                    unique: true,
                    fields: ['workspace_id', 'user_id']
                },
            ],

        }
    );

    return WorkspaceUser;
}

