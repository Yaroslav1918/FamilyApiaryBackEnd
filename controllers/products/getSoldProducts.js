const Cart = require("../../models/product");

const getSoldProducts = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await Cart.findOne({ owner: _id });
    console.log(
      "🚀 ~ file: getSoldProducts.js:8 ~ getSoldProducts ~  req.body.cartItems:",
      req.body.cartItems
    );
    const { items, totalQuantity, wishlist, wishTotalQuantity } =
      req.body.cartItems;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const date = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${date}`;
    if (!user.boughtProducts.has(formattedDate)) {
      user.boughtProducts.set(formattedDate, {
        items: [...items, ...wishlist],
        boughtTotalQuantity: totalQuantity + wishTotalQuantity,
      });
    } else {
      const existingBoughtProduct = user.boughtProducts.get(formattedDate);
      existingBoughtProduct.items.push(...items, ...wishlist);
      existingBoughtProduct.boughtTotalQuantity +=
        totalQuantity + wishTotalQuantity;
      user.boughtProducts.set(formattedDate, existingBoughtProduct);
    }
    user.items = [];
    user.wishItems = [];
    user.totalQuantity = 0;
    user.wishTotalQuantity = 0;
    await user.save();
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getSoldProducts;
