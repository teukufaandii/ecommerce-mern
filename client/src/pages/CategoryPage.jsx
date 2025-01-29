import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import NotFoundPage from "./NotFoundPage";

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();

  const { category } = useParams();

  console.log("category:", category);

  const categories = [
    { slug: "jeans" },
    { slug: "t-shirts" },
    { slug: "shoes" },
    { slug: "glasses" },
    { slug: "jackets" },
    { slug: "suits" },
    { slug: "bags" },
  ];

  const categorySlug = categories.map((cat) => cat.slug);

  // return to not found page if category is not found
  if (!categorySlug.includes(category)) return <NotFoundPage />;

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  console.log("products:", products);
  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
              No products found for this category
            </h2>
          )}

          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
export default CategoryPage;
