const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Category = require("../models/Category");

const OLD_PRODUCT_IDS = [
  "65a7e45902e12c44f599444e","65a7e45902e12c44f599444f","65a7e45902e12c44f5994450","65a7e45902e12c44f5994451","65a7e45902e12c44f5994452",
  "65a7e45902e12c44f5994453","65a7e45902e12c44f5994454","65a7e45902e12c44f5994455","65a7e45902e12c44f5994456","65a7e45902e12c44f5994457",
  "65a7e45902e12c44f5994458","65a7e45902e12c44f5994459","65a7e45902e12c44f599445a","65a7e45902e12c44f599445b","65a7e45902e12c44f599445c",
  "65a7e45902e12c44f599445d","65a7e45902e12c44f599445e","65a7e45902e12c44f599445f","65a7e45902e12c44f5994460","65a7e45902e12c44f5994461",
  "65a7e45902e12c44f5994462","65a7e45902e12c44f5994463","65a7e45902e12c44f5994464","65a7e45902e12c44f5994465","65a7e45902e12c44f5994466",
  "65a7e45902e12c44f5994467","65a7e45902e12c44f5994468","65a7e45902e12c44f5994469","65a7e45902e12c44f599446a","65a7e45902e12c44f599446b",
  "65a7e45902e12c44f599446c","65a7e45902e12c44f599446d","65a7e45902e12c44f599446e","65a7e45902e12c44f599446f","65a7e45902e12c44f5994470",
  "65a7e45902e12c44f5994471","65a7e45902e12c44f5994472","65a7e45902e12c44f5994473","65a7e45902e12c44f5994474","65a7e45902e12c44f5994475",
  "65a7e45902e12c44f5994476","65a7e45902e12c44f5994477","65a7e45902e12c44f5994478","65a7e45902e12c44f5994479","65a7e45902e12c44f599447a",
  "65a7e45902e12c44f599447b","65a7e45902e12c44f599447c","65a7e45902e12c44f599447d","65a7e45902e12c44f599447e","65a7e45902e12c44f599447f",
  "65a7e45902e12c44f5994480","65a7e45902e12c44f5994481","65a7e45902e12c44f5994482","65a7e45902e12c44f5994483","65a7e45902e12c44f5994484",
  "65a7e45902e12c44f5994485","65a7e45902e12c44f5994486","65a7e45902e12c44f5994487","65a7e45902e12c44f5994488","65a7e45902e12c44f5994489",
  "65a7e45902e12c44f599448a","65a7e45902e12c44f599448b","65a7e45902e12c44f599448c","65a7e45902e12c44f599448d","65a7e45902e12c44f599448e",
  "65a7e45902e12c44f599448f","65a7e45902e12c44f5994490","65a7e45902e12c44f5994491","65a7e45902e12c44f5994492","65a7e45902e12c44f5994493",
  "65a7e45902e12c44f5994494","65a7e45902e12c44f5994495","65a7e45902e12c44f5994496","65a7e45902e12c44f5994497","65a7e45902e12c44f5994498",
  "65a7e45902e12c44f5994499","65a7e45902e12c44f599449a","65a7e45902e12c44f599449b","65a7e45902e12c44f599449c","65a7e45902e12c44f599449d",
  "65a7e45902e12c44f599449e","65a7e45902e12c44f599449f","65a7e45902e12c44f59944a0","65a7e45902e12c44f59944a1","65a7e45902e12c44f59944a2",
  "65a7e45902e12c44f59944a3","65a7e45902e12c44f59944a4","65a7e45902e12c44f59944a5","65a7e45902e12c44f59944a6","65a7e45902e12c44f59944a7",
  "65a7e45902e12c44f59944a8","65a7e45902e12c44f59944a9","65a7e45902e12c44f59944aa","65a7e45902e12c44f59944ab","65a7e45902e12c44f59944ac",
  "65a7e45902e12c44f59944ad","65a7e45902e12c44f59944ae","65a7e45902e12c44f59944af","65a7e45902e12c44f59944b0","65a7e45902e12c44f59944b1",
  "65a7e45902e12c44f59944b2",
];

exports.seedProduct = async () => {
  try {
    console.log("Fetching products from dummyjson API...");
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const { products: apiProducts } = await res.json();

    const brandMap = {};
    const categoryMap = {};

    const uniqueBrands = [...new Set(apiProducts.map((p) => p.brand).filter(Boolean))];
    const uniqueCategories = [...new Set(apiProducts.map((p) => p.category))];

    await Brand.deleteMany({});

    const defaultBrand = await Brand.create({ _id: "65a7e20102e12c44f59943da", name: "Generic" });
    brandMap[defaultBrand.name] = defaultBrand._id;
    brandMap["default"] = defaultBrand._id;

    const createdBrands = await Brand.insertMany(
      uniqueBrands.map((name) => ({ name }))
    );
    createdBrands.forEach((b) => { brandMap[b.name] = b._id; });

    await Category.deleteMany({});
    const createdCategories = await Category.insertMany(
      uniqueCategories.map((name) => ({ name }))
    );
    createdCategories.forEach((c) => { categoryMap[c.name] = c._id; });

    await Product.deleteMany({});
    const productDocs = apiProducts.map((p, i) => ({
      _id: OLD_PRODUCT_IDS[i],
      title: p.title,
      description: p.description,
      price: p.price,
      discountPercentage: p.discountPercentage || 0,
      category: categoryMap[p.category],
      brand: p.brand ? brandMap[p.brand] : brandMap["default"],
      stockQuantity: p.stock || 0,
      thumbnail: p.thumbnail,
      images: p.images,
      isDeleted: false,
    }));

    await Product.insertMany(productDocs);
    console.log(`Seeded ${productDocs.length} products from dummyjson API`);
  } catch (error) {
    console.log(error);
  }
};
