const Category = require("../models/category.model");

class CategoryController {
  // ✅ CREATE CATEGORY
  static async create(req, res) {
    try {
      const { name, description } = req.body;

      const existing = await Category.findOne({ name });

      if (existing) {
        return res.status(400).json({
          message: "Category already exists"
        });
      }

      const category = await Category.create({
        name,
        description
      });

      return res.status(201).json({
        message: "Category created successfully",
        data: category
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // ✅ GET ALL CATEGORIES (Admin)
  static async getAll(req, res) {
    try {
      const categories = await Category.find().sort({ createdAt: -1 });

      return res.json({
        count: categories.length,
        data: categories
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // ✅ GET SINGLE CATEGORY
  static async getOne(req, res) {
    try {
      const category = await Category.findById(req.params.id);

      if (!category) {
        return res.status(404).json({
          message: "Category not found"
        });
      }

      return res.json(category);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // ✅ UPDATE CATEGORY
  static async update(req, res) {
    try {
      const { name, description, isActive } = req.body;

      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { name, description, isActive },
        { new: true }
      );

      if (!category) {
        return res.status(404).json({
          message: "Category not found"
        });
      }

      return res.json({
        message: "Category updated successfully",
        data: category
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // ✅ DELETE CATEGORY
  static async delete(req, res) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);

      if (!category) {
        return res.status(404).json({
          message: "Category not found"
        });
      }

      return res.json({
        message: "Category deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = CategoryController;