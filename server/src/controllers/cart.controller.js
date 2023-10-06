import { Cart } from "../models/cart.model";
import createError from "http-errors";
import { OptionValue, Sku, Variant } from "../models/product.model";

export const addCart = async (req, res, next) => {
  try {
    const { cart_id, user_id, product } = req.body;

    const cart = await Cart.findOne({ cart_id: cart_id }).select(
      "-deleted_at -deleted -created_at -updated_at -createdAt -__v"
    );
    if (!cart) {
      const newCart = await Cart.create(req.body);
      newCart.products.push(product);
      if (!user_id) {
        newCart.isGuest = true;
      }
      await newCart.save();
      return res.json({
        status: 201,
        message: "tạo giỏ hàng thành công",
        data: newCart,
      });
    } else {
      const sku = cart.products.findIndex((item) => {
        return item.sku_id == product.sku_id;
      });
      if (user_id) {
        cart.isGuest = false;
        cart.user_id = user_id;
        await cart.save();
      }
      if (sku !== -1) {
        cart.products[sku].quantity += product.quantity;
        await cart.save();
        return res.json({
          status: 200,
          message: "Thêm sản phẩm thành công",
          data: cart,
        });
      } else {
        cart.products.push(product);
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
export const createCart = async (req, res, next) => {
  try {
    const newCart = await Cart.create(req.body);
    const total_money = newCart.products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    newCart.total_money = total_money;
    newCart.isGuest = true;
    await newCart.save();
    return res.json({
      status: 201,
      message: "tạo giỏ hàng thành công",
      data: newCart,
    });
  } catch (error) {
    next(error);
  }
};
export const getCart = async (req, res, next) => {
  try {
    const cart_id = req.params.cart_id;
    const cart = await Cart.findOne({ cart_id });
    const total_money = cart.products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    cart.total_money = total_money;
    await cart.save();
    const new_cart = cart.toObject();
    if (!cart) {
      throw createError.NotFound("Không tìm thấy giỏ hàng");
    }
    const get_sku = async (sku_id) => {
      const sku = await Sku.findById(sku_id).select(
        "name shared_url product_id slug image -_id"
      );
      return sku;
    };

    const skus = Promise.all(
      cart.products.map(async (item) => {
        const data = item.toObject();
        const data_sku = await get_sku(item.sku_id);
        // lấy ra biến thể của sku
        const variant = await Variant.find({
          sku_id: item.sku_id,
        }).populate(["option_value_id"]);
        const option_value = variant?.map(
          (item) => item?.toObject()?.option_value_id?.label
        );
        const new_data_sku = data_sku.toObject();
        return {
          ...data,
          ...new_data_sku,
          option_value,
        };
      })
    );
    const new_data = await skus;
    return res.json({
      status: 200,
      message: "Lấy giỏ hàng thành công",
      data: {
        ...new_cart,
        products: new_data,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const sku_id = req.params.sku_id;
    const { cart_id } = req.body;
    const cart = await Cart.findOne({ cart_id: cart_id });
    if (!cart) {
      throw createError.NotFound("Không tìm thấy giỏ hàng");
    }
    const new_cart = await Cart.findOneAndUpdate(
      { cart_id: cart_id },
      {
        $pull: { products: { sku_id: sku_id } },
      },
      { new: true }
    ).select("-deleted_at -deleted -created_at -updated_at -createdAt -__v");
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
    const { cart_id } = req.body;
    const sku_id = req.params.sku_id;
    const cart = await Cart.findOne({ cart_id: cart_id }).select(
      "-deleted_at -deleted -created_at -updated_at -createdAt -__v"
    );
    if (!cart) {
      throw createError.NotFound("Giỏ hàng đã được xoá");
    }
    const sku = cart.products.findIndex((item) => {
      return item.sku_id == sku_id;
    });
    if (cart.products[sku].quantity === 1) {
      throw createError.BadRequest("Tối thiểu số lượng sản phẩm là 1");
    }
    cart.products[sku].quantity--;
    await cart.save();
    return res.json({
      status: 200,
      message: "thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const addOneProduct = async (req, res, next) => {
  try {
    const { cart_id } = req.body;
    console.log(req.body);
    const sku_id = req.params.sku_id;
    const cart = await Cart.findOne({ cart_id }).select(
      "-deleted_at -deleted -created_at -updated_at -createdAt -__v"
    );
    console.log(cart);
    if (!cart) {
      throw createError.NotFound("Giỏ hàng đã được xoá");
    }
    const sku = cart.products.findIndex((item) => {
      return item.sku_id == sku_id;
    });
    if (cart.products[sku].quantity === cart.stock) {
      throw createError.BadRequest("sản phẩm đã đạt tối đa");
    }
    cart.products[sku].quantity++;
    await cart.save();
    return res.json({
      status: 200,
      message: "thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const getCartByUserId = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const cart = await Cart.findOne({ user_id: user_id });

    if (!cart) {
      return res.json({
        status: 200,
        message: "Không tìm thấy giỏ hàng",
        data: null,
      });
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
