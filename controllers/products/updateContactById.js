const { Stats, addJoiSchema } = require("../../models/product");
const createError = require("../../helpers/createError");
const { isValidObjectId } = require("mongoose");

const updateContactById = async (req, res) => {
  const { error } = addJoiSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Stats.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateContactById;
