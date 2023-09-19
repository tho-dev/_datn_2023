import { Cart } from "../models/cart.model";
import createError from "http-errors";

export const addCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user_id: req.body.user_id });

    if (!cart) {
      const newCart = await Cart.create(req.body);
      return res.json({
        status: 201,
        message: "tạo giỏ hàng thành công",
        data: newCart,
      });
    } else {
      const sku_id = cart.products.find((item) => {
        return item.variants == req.body.products[0].variants;
      });
      if (sku_id) {
        const new_cart = await Cart.findOneAndUpdate(
          {
            user_id: req.body.user_id,
            "products._id": sku_id._id,
          },
          {
            $set: {
              "products.$": req.body.products[0],
            },
          },
          { new: true }
        );
        const total = new_cart.products.reduce((acc, item) => {
          return acc + item.price;
        }, 0);

        const result = await Cart.findByIdAndUpdate(
          { _id: new_cart._id },
          {
            $set: { total: total },
          },
          { new: true }
        );
        return res.json({
          status: 200,
          message: "Thêm sản phẩm thành công",
          data: result,
        });
      } else {
        cart.products.push(req.body.products[0]);
        await cart.save();
        const total = cart.products.reduce((acc, item) => {
          return acc + item.price;
        }, 0);

        const result = await Cart.findByIdAndUpdate(
          { _id: cart._id },
          {
            $set: { total: total },
          },
          { new: true }
        );
        return res.json({
          status: 200,
          message: "Thêm mới sản phẩm thành công",
          data: result,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user_id: req.body.user_id }).populate([
      { path: "user_id" },
      {
        path: "products.variants",
        populate: {
          path: "product_id",
          model: "Product",
        },
      },
    ]);
    if (!cart) {
      throw createError.NotFound("Không tìm thấy giỏ hàng");
    }
    return res.json({
      status: 200,
      message: "Lấy giỏ hàng thành công",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findOne({ user_id: req.body.user_id });
    if (cart.products.length === 0) {
      await Cart.findOneAndDelete({ user_id: req.body.user_id });
      return res.json({
        status: 200,
        message: "xoá giỏ hàng thành công",
        data: [],
      });
    }
    if (!cart) {
      throw createError.NotFound("Không tìm thấy giỏ hàng");
    }
    const new_cart = await Cart.findOneAndUpdate(
      { user_id: req.body.user_id },
      {
        $pull: { products: { _id: id } },
      },
      { new: true }
    );
    const total = cart.products.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    const result = await Cart.findByIdAndUpdate(
      { _id: cart._id },
      {
        $set: { total: total },
      },
      { new: true }
    ).populate([{ path: "user_id" }, { path: "products.variants" }]);

    return res.json({
      status: 200,
      message: "xoá sản phẩm thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findByIdAndDelete(id);
    return res.json({
      status: 200,
      message: "Xoá giỏ hàng thành công",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};
