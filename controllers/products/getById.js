const { Stats } = require("../../models/product");
const createError = require("../../helpers/createError");
const { isValidObjectId } = require("mongoose");

const getById = async (req, res) => {
  const { _id: owner } = req.user;

  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Stats.findOne(
    { _id: id, owner },
    "-createdAt -updatedAt"
  );
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getById;
