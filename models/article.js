"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsToMany(models.Tag, {
        through: "TagArticle",
        foreignKey: "articleId",
        otherKey: "tagId",
      });
      Article.belongsToMany(models.SubCategory, {
        through: "CategoryArticle",
        foreignKey: "articleId",
        otherKey: "subCategoryId",
      });
      Article.belongsToMany(models.User, {
        through: "Reaction",
        foreignKey: "articleId",
        otherKey: "userId",
      });
      // Article.belongsToMany(models.Comment, {
      //   through: "Reaction",
      //   foreignKey: "articleId",
      //   otherKey: "commentId",
      // });
      Article.belongsToMany(models.User, {
        through: "Comment",
        foreignKey: "articleId",
        otherKey: "userId",
      });
      Article.belongsTo(models.User, {
        foreignKey: "authorId",
        as: "author",
        scope: {
          role: "writer",
        },
      });
      Article.belongsTo(models.User, {
        foreignKey: "editorId",
        as: "editor",
        scope: {
          role: "editor",
        },
      });
    }
    static getSearchVectorName() {
      return "vectorSearch";
    }
    static addSearchIndex() {
      var searchFields = ['name', 'description', 'content'];
      var vectorName = Article.getSearchVectorName();
      sequelize
          .query(`ALTER TABLE "${Article.tableName}" ADD COLUMN "${vectorName}" TSVECTOR`)
          .then(() => {
              return sequelize.query(`UPDATE "${Article.tableName}" SET "${vectorName}" = to_tsvector('english', '${searchFields.join('\' || \'')}');`).catch(e => console.log(e));
          })
          .then(() => {
              return sequelize.query(`CREATE INDEX post_search_idx ON "${Article.tableName}" USING gin("${vectorName}");`).catch(e => console.log(e));
          })
          .then(() => {
              return sequelize.query(`CREATE TRIGGER post_vector_update BEFORE INSERT OR UPDATE ON "${Article.tableName}" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("${vectorName}", 'pg_catalog.english', ${searchFields.join(', ')})`).catch(e => console.log(e));
          }).catch(e => console.log(e));
    }
  }
  Article.init(
    {
      name: DataTypes.TEXT,
      slug: DataTypes.TEXT,
      premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM(
          "draft",
          "pending",
          "rejected",
          "approved",
          "posted"
        ),
        allowNull: false,
        defaultValue: "draft",
      },
      imgCover: DataTypes.TEXT,
      description: DataTypes.TEXT,
      content: DataTypes.TEXT,
      nLike: DataTypes.INTEGER,
      nComment: DataTypes.INTEGER,
      nView: DataTypes.INTEGER,
      nViewWeek: DataTypes.INTEGER,
      nViewMonth: DataTypes.INTEGER,
      approve: DataTypes.DATE,
      weekTime: DataTypes.DATE,
      reviewComment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
