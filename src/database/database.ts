import { Sequelize, DataTypes } from 'sequelize';
import {
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_SCHEMA,
    DATABASE_HOST
} from '../config/config';
import { UserModel } from '../models/user.model';
import { WorkspaceModel } from '../models/workspace.model';
import { WorkspaceUserModel } from '../models/workspaceUser.model';

const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        dialect: 'postgres',
        schema: DATABASE_SCHEMA,
        logging: console.log, // Enable logging to see SQL queries in the console
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

const db: any = {};
db.sequelize = sequelize;

// Initialize the User model
db.users = UserModel(sequelize);
db.workspaces = WorkspaceModel(sequelize);
db.workspaceUser = WorkspaceUserModel(sequelize);

// Associates
db.users.belongsToMany(db.workspaces, {through: db.workspaceUser, foreignKey: 'user_id', otherKey: 'workspace_id'});
db.workspaces.belongsToMany(db.users, {through: db.workspaceUser, foreignKey: 'workspace_id', otherKey: 'user_id'});

// sequelize.sync({ alter: true }) // 'alter: true' to sync without dropping existing tables
//     .then(() => {
//         console.log('Database & tables created!');
//     })
//     .catch((error) => {
//         console.error('Error creating database & tables:', error);
//     });

export default db; // Use `export default` to ensure consistency in importing
