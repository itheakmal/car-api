const Category = require("../Models/Category")
/**
* Get all categories
* @returns {Promise<Category[]>} - All categories
*/
const getCategory = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
};

/**
 * Create a new category
 * @param {string} name - Category name
 * @returns {Promise<Category>} - Created category
 */
const createCategory = async (req, res) => {
    // validate req
    const { error, value } = Category.categoryValidate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    try {
        const category = await Category.createCategory(value.name);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create category' });
    }
};

/**
 * Update a category
 * @param {number} categoryId - Category ID
 * @param {string} name - Updated category name
 * @returns {Promise<Category>} - Updated category
 */
const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    // validate req
    const { error, value } = Category.categoryValidate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = value.name;
        await category.save();

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update category' });
    }
};

/**
 * Delete a category
 * @param {number} categoryId - Category ID
 * @returns {Promise} - Empty response
 */
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category' });
    }
};

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}