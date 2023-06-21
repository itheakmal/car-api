const { DataTypes } = require('sequelize');
const joi = require('joi');
const sequelize = require('./index');
const slugify = require('slugify');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const categorySchema = joi.object({
  name: joi.string().required(),
});
Category.categoryValidate = (input) => {
  return categorySchema.validate(input);
};

/**
 * Create a new category
 * @param {string} name - Category name
 * @returns {Promise<Category>} - Created category
 */
Category.createCategory = async (name) => {
  const slug = slugify(name, { lower: true, strict: true, remove: /[$*_+~.()'"!:@]/g, });
  const category = await Category.create({ name, slug });
  return category;
};


module.exports = Category;