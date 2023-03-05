//not needed yet

const Sequelize = require("sequelize");
module.exports = function createUserModel(sequelize) {
    const User = sequelize.define(
      "User",
      {
        name: { type: Sequelize.STRING, allowNull: false },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: { isEmail: true },
        },
        // picture: {
        //   type: Sequelize.STRING,
        // },
        password: { type: Sequelize.STRING, allowNull: false },
      },
      {}
    );
  
    // User.associate = ({ Article, ArticleAuthors }) =>
    //   User.belongsToMany(Article, {
    //     as: "articles",
    //     through: ArticleAuthors,
    //     foreignKey: "authorId",
    //   });

    return User;
  };