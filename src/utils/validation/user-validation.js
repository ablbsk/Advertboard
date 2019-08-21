import Joi from 'joi';
import { createErrorObj } from './validation';

export const userValidation = (state) => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .min(4)
      .max(20)
      .regex(/^[a-zA-Z0-9.-]+$/)
      .required()
      .error((errors) => {
        const firstError = errors[0];
        switch (firstError.type) {
          case 'any.empty':
          case 'any.required':
            firstError.message = 'The username should not be empty.';
            break;
          case 'string.min':
            firstError.message = `The username should have at least ${firstError.context.limit} characters`;
            break;
          case 'string.regex.base':
            firstError.message = 'The username may contain letters or numbers.';
            break;
          case 'string.max':
            firstError.message = `The username should have at most ${firstError.context.limit} characters`;
            break;
          default:
            break;
        }
        return firstError;
      }),

    email: Joi.string()
      .email()
      .required()
      .error(() => 'Email must contain at least 6 symbols.')
      .optional(),

    password: Joi.string()
      .min(6)
      .required()
      .error(() => 'Password must contain at least 6 symbols.')
      .optional(),

    firstName: Joi.string()
      .min(2)
      .max(20)
      .regex(/^([a-zA-Z-\s])+$/)
      .required()
      .error((errors) => {
        const firstError = errors[0];
        switch (firstError.type) {
          case 'any.empty':
          case 'any.required':
            firstError.message = 'First name should not be empty.';
            break;
          case 'string.min':
            firstError.message = `First name should have at least ${firstError.context.limit} characters`;
            break;
          case 'string.regex.base':
            firstError.message = 'First name may contain letters. Space and symbol "." are allowed.';
            break;
          case 'string.max':
            firstError.message = `First name should have at most ${firstError.context.limit} characters`;
            break;
          default:
            break;
        }
        return firstError;
      }),

    lastName: Joi.string()
      .min(2)
      .max(20)
      .regex(/[a-zA-Z]/)
      .required()
      .error((errors) => {
        const firstError = errors[0];
        switch (firstError.type) {
          case 'any.empty':
          case 'any.required':
            firstError.message = 'Last name should not be empty.';
            break;
          case 'string.min':
            firstError.message = `Last name should have at least ${firstError.context.limit} characters`;
            break;
          case 'string.regex.base':
            firstError.message = 'Last name may contain letters. Space and symbol "." are allowed.';
            break;
          case 'string.max':
            firstError.message = `Last name should have at most ${firstError.context.limit} characters`;
            break;
          default:
            break;
        }
        return firstError;
      }),

    phone: Joi.string()
      .regex(/^((\+375)+(29|33)+([0-9]){7})+$/)
      .required()
      .error(() => 'The phone must be in the format +375 29|33 xxx xx xx.'),
  });

  const result = Joi.validate(state, schema, { abortEarly: false, allowUnknown: true });
  if (result.error === null) {
    return 'good';
  }

  return createErrorObj(result.error.details);
};
