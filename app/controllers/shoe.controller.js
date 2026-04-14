const Shoe = require("../models/shoe.model");
const Category = require("../models/category.model");
const Brand = require("../models/brand.model");
const mongoose = require("mongoose");

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
  // static async getAdminShoes(req, res) {
  //   try {
  //     const shoes = await Shoe.find()
  //       .populate("brand category")
  //       .sort({ createdAt: -1 });

  //     return res.json({
  //       count: shoes.length,
  //       data: shoes
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: error.message
  //     });
  //   }
  // }
  static async getAdminShoes(req, res) {
  try {
    //  pagination params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    //  total count
    const total = await Shoe.countDocuments();

    //  paginated data
    const shoes = await Shoe.find()
      .populate("brand category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.json({
      total,                         // total records
      page,                          // current page
      totalPages: Math.ceil(total / limit),
      limit,                         // per page
      count: shoes.length,           // current page count
      data: shoes
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

  //  GET PUBLIC SHOES (FILTER + ONLY PUBLISHED)
 //  GET PUBLIC SHOES (FILTER + PAGINATION)
static async getPublicShoes(req, res) {
  try {
    const {
      category,
      brand,
      color,
      minPrice,
      maxPrice,
      size,
      page,
      limit
    } = req.query;

    // ✅ pagination
    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(limit) || 10;
    const skip = (currentPage - 1) * perPage;

    let filter = { isPublished: true };

    // ✅ CATEGORY (ID OR NAME)
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        filter.category = category;
      } else {
        const categoryDoc = await Category.findOne({
          name: { $regex: category, $options: "i" }
        });

        if (categoryDoc) {
          filter.category = categoryDoc._id;
        } else {
          return res.json({
            total: 0,
            page: currentPage,
            totalPages: 0,
            data: []
          });
        }
      }
    }

    // ✅ BRAND (ID OR NAME)
    if (brand) {
      if (mongoose.Types.ObjectId.isValid(brand)) {
        filter.brand = brand;
      } else {
        const brandDoc = await Brand.findOne({
          name: { $regex: brand, $options: "i" }
        });

        if (brandDoc) {
          filter.brand = brandDoc._id;
        }
      }
    }

    // ✅ OTHER FILTERS
    if (color) filter.color = color;
    if (size) filter.size = size;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // ✅ total count
    const total = await Shoe.countDocuments(filter);

    // ✅ data
    const shoes = await Shoe.find(filter)
      .populate("brand category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    return res.json({
      total,
      page: currentPage,
      totalPages: Math.ceil(total / perPage),
      limit: perPage,
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