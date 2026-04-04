const Shoe = require("../models/shoe.model");

class ShoeController {
  //  CREATE SHOE (ADMIN)
  static async create(req, res) {
    try {
      const images = [];

      if (req.fileUrl) {
        images.push(req.fileUrl);
      }

      const shoe = await Shoe.create({
        ...req.body,
        images
      });

      return res.status(201).json({
        message: "Shoe created successfully",
        data: shoe
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  GET ALL (ADMIN → published + unpublished)
  static async getAdminShoes(req, res) {
    try {
      const shoes = await Shoe.find()
        .populate("brand category")
        .sort({ createdAt: -1 });

      return res.json({
        count: shoes.length,
        data: shoes
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  GET PUBLIC SHOES (FILTER + ONLY PUBLISHED)
  static async getPublicShoes(req, res) {
    try {
      const {
        category,
        brand,
        color,
        minPrice,
        maxPrice,
        size
      } = req.query;

      let filter = { isPublished: true };

      if (category) filter.category = category;
      if (brand) filter.brand = brand;
      if (color) filter.color = color;
      if (size) filter.size = size;

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }

      const shoes = await Shoe.find(filter)
        .populate("brand category")
        .sort({ createdAt: -1 });

      return res.json({
        count: shoes.length,
        data: shoes
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  GET ONE SHOE (ADMIN)
  static async getOne(req, res) {
    try {
      const shoe = await Shoe.findById(req.params.id).populate(
        "brand category"
      );

      if (!shoe) {
        return res.status(404).json({
          message: "Shoe not found"
        });
      }

      return res.json(shoe);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  UPDATE SHOE
  static async update(req, res) {
    try {
      const updateData = { ...req.body };

      if (req.fileUrl) {
        updateData.images = [req.fileUrl];
      }

      const shoe = await Shoe.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!shoe) {
        return res.status(404).json({
          message: "Shoe not found"
        });
      }

      return res.json({
        message: "Shoe updated successfully",
        data: shoe
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  DELETE SHOE
  static async delete(req, res) {
    try {
      const shoe = await Shoe.findByIdAndDelete(req.params.id);

      if (!shoe) {
        return res.status(404).json({
          message: "Shoe not found"
        });
      }

      return res.json({
        message: "Shoe deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  PUBLISH
  static async publish(req, res) {
    try {
      const shoe = await Shoe.findByIdAndUpdate(
        req.params.id,
        { isPublished: true },
        { new: true }
      );

      return res.json({
        message: "Shoe published",
        data: shoe
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  UNPUBLISH
  static async unpublish(req, res) {
    try {
      const shoe = await Shoe.findByIdAndUpdate(
        req.params.id,
        { isPublished: false },
        { new: true }
      );

      return res.json({
        message: "Shoe unpublished",
        data: shoe
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = ShoeController;