import Joi from 'joi';
import { createErrorObj } from './validation';

export const changePasswordValidation = (state) => {
  const schema = Joi.object().keys({
    curPassUserPass: Joi.string()
      .required()
      .error(() => 'Please, enter you current password.'),

    newPassword: Joi.string()
      .min(6)
      .required()
      .error((errors) => {
        const firstError = errors[0];
        switch (firstError.type) {
          case 'any.empty':
          case 'any.required':
            firstError.message = 'Password should not be empty.';
            break;
          case 'string.min':
            firstError.message = `Password should have at least ${firstError.context.limit} characters`;
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
