import Joi from "joi";

export const createValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    slug: Joi.string().required(),
  })
};
