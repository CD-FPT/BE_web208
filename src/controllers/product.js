import Product from '../models/product.js'
import productSchema from '../validation/product.js';
import Category from '../models/category.js'

export const getAll = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
    if (products.length == 0) {
      return res.status(400).json({
        message: "Không có sản phẩm nào"
      })
    }
    return res.status(200).json({
      message: " tìm sản phẩm thành công",
      datas: products
    })
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server"
    })
  }
}
export const getDetail = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id).populate("categoryId");
    if (!products) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm"
      })
    }
    return res.status(200).json({
      message: " tìm sản phẩm thành công",
      datas: products
    })
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server"
    })
  }
}

export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      })
    }
    const product = await Product.create(req.body);
    const addcate = await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: { products: product._id }
    });
    if (!addcate) {
      return res.status(400).json({
        message: "Thêm danh mục cho sản phẩm không thành công !"
      })
    }
    if (!product) {
      return res.status(400).json({
        message: "Không thêm được sản phẩm"
      })
    }
    return res.status(200).json({
      message: " Thêm sản phẩm thành công",
      datas: product
    })
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server"
    })
  }
}

export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Sản phẩm đã được xóa thành công",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};


export const update = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      })
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Sản phẩm đã được cập nhật thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
