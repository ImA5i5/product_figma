const Brand = require("../models/brand.model");

class BrandController {
  //  CREATE BRAND
  static async create(req, res) {
    try {
      const { name, description } = req.body;

      const existing = await Brand.findOne({ name });
      if (existing) {
        return res.status(400).json({
          message: "Brand already exists"
        });
      }

      const brand = await Brand.create({
        name,
        description,
        logo: req.fileUrl || null
      });

      return res.status(201).json({
        message: "Brand created successfully",
        data: brand
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  GET ALL BRANDS
  static async getAll(req, res) {
    try {
      const brands = await Brand.find().sort({ createdAt: -1 });

      return res.json({
        count: brands.length,
        data: brands
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  GET ONE BRAND
  static async getOne(req, res) {
    try {
      const brand = await Brand.findById(req.params.id);

      if (!brand) {
        return res.status(404).json({
          message: "Brand not found"
        });
      }

      return res.json(brand);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  UPDATE BRAND
  static async update(req, res) {
    try {
      const { name, description, isActive } = req.body;

      const updateData = {
        name,
        description,
        isActive
      };

      if (req.fileUrl) {
        updateData.logo = req.fileUrl;
      }

      const brand = await Brand.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!brand) {
        return res.status(404).json({
          message: "Brand not found"
        });
      }

      return res.json({
        message: "Brand updated successfully",
        data: brand
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  DELETE BRAND
  static async delete(req, res) {
    try {
      const brand = await Brand.findByIdAndDelete(req.params.id);

      if (!brand) {
        return res.status(404).json({
          message: "Brand not found"
        });
      }

      return res.json({
        message: "Brand deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = BrandController;