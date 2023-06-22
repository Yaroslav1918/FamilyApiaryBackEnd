const Joi = require("joi");

const productsSchemaValidation = (req, res, next) => {
  const schema = Joi.object({
    items: Joi.array().items(
      Joi.object({
        image: Joi.string().required(),
        text: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        totalPrice: Joi.number().required(),
      })
    ),
    totalQuantity: Joi.number().required(),
    boughtProducts: Joi.object().pattern(
      Joi.string(),
      Joi.object({
        items: Joi.array().items(
          Joi.object({
            id: Joi.number(),
            image: Joi.string(),
            text: Joi.string(),
            price: Joi.number(),
            quantity: Joi.number(),
            totalPrice: Joi.number(),
          })
        ),
        boughtTotalQuantity: Joi.number(),
      })
    ),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

module.exports = productsSchemaValidation;
