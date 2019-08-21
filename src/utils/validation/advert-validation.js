import Joi from 'joi';
import { createErrorObj } from './validation';

export const advertValidation = (state) => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(10)
      .max(50)
      .regex(/^[a-zA-Z0-9-.\s]+$/)
      .required()
      .error((errors) => {
        const firstError = errors[0];
        switch (firstError.type) {
          case 'any.empty':
          case 'any.required':
            firstError.message = 'The title should not be empty.';
            break;
          case 'string.min':
            firstError.message = `The title should have at least ${firstError.context.limit} characters`;
            break;
          case 'string.regex.base':
            firstError.message = 'The title may contain letters or numbers.';
            break;
          case 'string.max':
            firstError.message = `The title should have at most ${firstError.context.limit} characters`;
            break;
          default:
            break;
        }
        return firstError;
      }),

    description: Joi.string()
      .regex(/^[a-zA-Z0-9-.\s]+$/)
      .required()
      .error((errors) => {
        const firstError = errors[0];
        switch (firstError.type) {
          case 'any.empty':
          case 'any.required':
            firstError.message = 'The description should not be empty.';
            break;
          case 'string.regex.base':
            firstError.message = 'The description may contain letters, numbers or symbols "." , "-".';
            break;
          default:
            break;
        }
        return firstError;
      }),

    category: Joi.string()
      .required()
      .error(() => 'You don\'t chose the category.'),

    price: Joi.string()
      .regex(/^\d*\.?\d+$/)
      .required()
      .error((errors) => {
        const firstError = errors[0];
        switch (firstError.type) {
          case 'any.empty':
          case 'any.required':
            firstError.message = 'The price should not be empty.';
            break;
          case 'string.regex.base':
            firstError.message = 'The price can only be a positive numeric value.';
            break;
          default:
            break;
        }
        return firstError;
      }),
  });

  const result = Joi.validate(state, schema, { abortEarly: false, stripUnknown: true });
  if (result.error === null) {
    return 'good';
  }

  return createErrorObj(result.error.details);
};
