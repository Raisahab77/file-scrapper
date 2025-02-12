import { Model, DataTypes, Sequelize } from 'sequelize';

export interface WorkspaceAttributes {
    workspace_id: string;
    workspace_name: string;
    max_files: number;
    scrapped_files: number;
    current_plan: string;
    max_workspace_member: number;
    current_workspace_member: number;
}

export class Workspace extends Model<WorkspaceAttributes> implements WorkspaceAttributes {
    public workspace_id: string;
    public workspace_name!: string;
    public max_files!: number;
    public scrapped_files!: number;
    public current_plan!: string;
    public max_workspace_member!: number;
    public current_workspace_member!: number;
}

export function WorkspaceModel(sequelize: Sequelize): typeof Workspace {
    Workspace.init(
        {
            workspace_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            workspace_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notEmpty: true,
                    min: 3,
                    max: 10,
                    is: /^[a-zA-Z0-9]{3,10}$/
                }
            },
            max_files: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 5,
            },
            scrapped_files: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            current_plan:{
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'free',
                validate:{
                    isIn: [['free', 'pro', 'premium']]
                }
            },
            max_workspace_member:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 5,
            },
            current_workspace_member:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            }
        },
        {
            sequelize,
            timestamps: true,
            freezeTableName: true,
            tableName: 'workspaces',
        }
    );

    return Workspace;
}

