import { Cart } from "../models/cart.model";
import createError from "http-errors";

export const addCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user_id: req.body.user_id }).select(
      "-deleted_at -deleted -created_at -updated_at -createdAt -__v"
    );
    if (!cart) {
      const newCart = await Cart.create(req.body);
      const total_money = newCart.products.reduce((sum, product) => {
        return sum + product.price * product.quantity;
      }, 0);
      newCart.total_money = total_money;
      await newCart.save();
      return res.json({
        status: 201,
        message: "tạo giỏ hàng thành công",
        data: newCart,
      });
    } else {
      const sku = cart.products.findIndex((item) => {
        return item.sku_id == req.body.products[0].sku_id;
      });
      if (sku !== -1) {
        cart.products[sku].quantity++;
        await cart.save();
        const total = cart.products.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
        cart.total_money = total;
        await cart.save();
        return res.json({
          status: 200,
          message: "Thêm sản phẩm thành công",
          data: cart,
        });
      } else {
        cart.products.push(req.body.products[0]);
        await cart.save();
        const total = cart.products.reduce((acc, item) => {
          return acc + item.price;
        }, 0);
        cart.total_money = total;
        await cart.save();
        return res.json({
          status: 200,
          message: "Thêm mới sản phẩm thành công",
          data: cart,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user_id: req.body.user_id });
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
    if (!cart) {
      throw createError.NotFound("Không tìm thấy giỏ hàng");
    }
    const new_cart = await Cart.findOneAndUpdate(
      { user_id: req.body.user_id },
      {
        $pull: { products: { _id: id } },
      },
      { new: true }
    ).select("-deleted_at -deleted -created_at -updated_at -createdAt -__v");

    const total = cart.products.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    new_cart.total_money = total;
    await new_cart.save();
    return res.json({
      status: 200,
      message: "xoá sản phẩm thành công",
      data: new_cart,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findByIdAndDelete(id).select(
      "-deleted_at -deleted -created_at -updated_at -createdAt -__v"
    );
    if (!cart) {
      throw createError.NotFound("Giỏ hàng đã được xoá");
    }
    return res.json({
      status: 200,
      message: "Xoá giỏ hàng thành công",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteOneProduct = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user_id: req.body.user_id }).select(
      "-deleted_at -deleted -created_at -updated_at -createdAt -__v"
    );
    if (!cart) {
      throw createError.NotFound("Giỏ hàng đã được xoá");
    }
    const sku = cart.products.findIndex((item) => {
      return item.sku_id == req.body.products[0].sku_id;
    });
    if (cart.products[sku].quantity === 1) {
      throw createError.BadRequest("Tối thiểu số lượng sản phẩm là 1");
    }
    cart.products[sku].quantity--;
    await cart.save();
  } catch (error) {
    next(error);
  }
};
