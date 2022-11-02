const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt"); // for password hashing

class User extends Model {
  // add method to compare password
  checkPassword(loginPw) {
    try {
      console.log(this.password);
      console.log(loginPw);
      return bcrypt.compareSync(loginPw, this.password);
    } catch (err) {
      console.log(err);
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    // created hooks to hash password before create and update
    // note: does not support bulk create
    hooks: {
      async beforeCreate(newUserData) {
        try {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
      async beforeUpdate(updatedUserData) {
        try {
          updatedUserData.password = await bcrypt.hash(
            updatedUserData.password,
            10
          );
          return updatedUserData;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
