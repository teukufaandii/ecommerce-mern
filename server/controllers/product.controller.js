import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const items = await Product.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: "Error occured in getAllProducts",
      error: error.message,
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not in redis, get from db and store in redis
    // .lean() function is used to return a plain javascript object instead of a mongoose object
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({
      message: "Error occured in getFeaturedProducts",
      error: error.message,
    });
  }
};

export const createProducts = async (req, res) => {
  try {
    const { name, description, price, image, category, isFeatured } = req.body;

    let cloudinaryRes = null;

    if (image) {
      cloudinaryRes = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const imageLink = cloudinaryRes?.secure_url ? cloudinaryRes.secure_url : "";

    const product = Product.create({
      name,
      description,
      price,
      image: imageLink,
      category,
      isFeatured,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error occured in createProducts",
      error: error.message,
    });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("Failed to delete image from cloudinary", error.message);
      }
    }

    await Product.findByIdAndDelete(id);

    res(201).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occured in deleteProducts",
      error: error.message,
    });
  }
};
