import Category from "../models/category.js";
import categorySchema from "../validation/category.js";
import Product from "../models/product.js";

export const getAll = async (req, res) => {
  try {
    const categories = await Category.find().populate("products");
    if (categories.length === 0) {
      return res.status(200).json({
        message: "Không có category nào",
        data: [],
      });
    }
    return res.status(200).json({
      message: "Lấy danh sách thành công",
      datas: categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      datas: [],
    });
  }
};
export const get = async function (req, res) {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.json({
        message: "Không có category nào",
        datas: [],
      });
    }
    return res.json({
      message: "Lay category thành công!",
      datas: category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      datas: [],
    });
  }
};
export const create = async function (req, res) {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        datas: [],
      });
    }
    const category = await Category.create(req.body);
    if (!category) {
      return res.json({
        message: "Thêm category không thành công!",
        datas: [],
      });
    }
    return res.json({
      message: "Thêm category thành công",
      data: [category],
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      datas: [],
    });
  }
};
export const updatePatch = async function (req, res) {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.json({
        message: "Cập nhật category không thành công",
      });
    }
    return res.json({
      message: "Cập nhật category thành công",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const remove = async function (req, res) {
  try {
    const categoryId = req.params.id
    await Product.deleteMany({categoryId})
    const category = await Category.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa category thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
