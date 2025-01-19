import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItems = user.cartItems.find((item) => item.id === productId);
    if (existingItems) {
      existingItems.quantity += 1;
    } else {
      user.cartItems.push({ id: productId, quantity: 1 });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in addToCart", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in removeAllFromCart", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItems = user.cartItems.find((item) => item.id === productId);
    if (existingItems) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.json(user.cartItems);
      }
      existingItems.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in updateQuantity", error: error.message });
  }
};

export const getAllCartItems = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });

    //add quantity for each product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find((i) => i.id === product.id);
      return { ...product.toJSON(), quantity: item.quantity };
    });
    res.json(cartItems);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in getAllCartItems", error: error.message });
  }
};
