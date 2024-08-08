import Joi from "joi";

export const createValidation = {
  body: Joi.object({
    task: Joi.string().required(),
  })
};

export const updateValidation = {
  body: Joi.object({
    task: Joi.string().required(),
  })
};

export const batchChangeItemStatusValidation = {
  body: Joi.object({
    ids: Joi.array().required(),
  })
};
