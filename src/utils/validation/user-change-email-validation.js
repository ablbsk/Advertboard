import Joi from 'joi';
import { createErrorObj } from './validation';

export const changeUserEmailValidation = (state) => {
  const schema = Joi.object().keys({
    curPassUserEmail: Joi.string()
      .required()
      .error(new Error('Please, enter you current password.')),

    email: Joi.string()
      .email()
      .min(6)
      .max(30)
      .required()
      .error((errors) => {
        const firstError = errors[0];
        switch (firstError.type) {
          case 'any.empty':
          case 'any.required':
            firstError.message = 'Email should not be empty.';
            break;
          case 'string.min':
            firstError.message = `Email should have at least ${firstError.context.limit} characters`;
            break;
          case 'string.max':
            firstError.message = `Email should have at most ${firstError.context.limit} characters`;
            break;
          default:
            break;
        }
        return firstError;
      }),
  });

  const result = Joi.validate(state, schema);
  if (result.error === null) {
    return 'good';
  }

  return createErrorObj(result.error.details);
};
