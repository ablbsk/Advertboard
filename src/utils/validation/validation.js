import Joi from 'joi';

export const advertValidation = (state) => {
  const schema = Joi.object().keys({
    title: Joi.string().regex(/^([a-zA-Z0-9-.\s]{10,50})+$/).required()
      .error(new Error('Please Enter you title')),
    description: Joi.string().regex(/^[a-zA-Z0-9-.\s]+$/).required()
      .error(new Error('Please Enter you description')),
    category: Joi.string(),
    price: Joi.string().regex(/^\d*\.?\d+$/).required()
      .error(new Error('Please Enter you price')),
  });

  const result = Joi.validate(state, schema);
  if (result.error === null) {
    return 'good';
  }
  return result.error.message;
};

export const signUpValidation = (state) => {
  const schema = Joi.object().keys({
    username: Joi.string().regex(/^([a-zA-Z0-9.-]{4,20})+$/).required()
      .error(new Error('Please Enter you username')),
    email: Joi.string().email().min(3).max(30).required()
      .error(new Error('Please Enter you email')),
    password: Joi.string().min(6).required()
      .error(new Error('Please Enter you password')),
    firstName: Joi.string().regex(/^([a-zA-Z-\s]{2,20})+$/).required()
      .error(new Error('Please Enter you first name')),
    lastName: Joi.string().regex(/[a-zA-Z]{2,20}/).required()
      .error(new Error('Please Enter you last name')),
    phone: Joi.string().regex(/^((\+375)+(29|33)+([0-9]){7})+$/).required()
      .error(new Error('Please Enter you phone')),
    validError: Joi.insensitive()
  });

  const result = Joi.validate(state, schema);
  if (result.error === null) {
    return 'good';
  }
  return result.error.message;
};

export const updateUserValidation = (state) => {
  const schema = Joi.object().keys({
    username: Joi.string().regex(/^([a-zA-Z0-9.-]{4,20})+$/).required()
      .error(new Error('Please Enter you username')),
    firstName: Joi.string().regex(/^([a-zA-Z-\s]{2,20})+$/).required()
      .error(new Error('Please Enter you first name')),
    lastName: Joi.string().regex(/[a-zA-Z]{2,20}/).required()
      .error(new Error('Please Enter you last name')),
    phone: Joi.string().regex(/^((\+375)+(29|33)+([0-9]){7})+$/).required()
      .error(new Error('Please Enter you phone')),
  });

  const result = Joi.validate(state, schema);
  if (result.error === null) {
    return 'good';
  }
  return result.error.message;
};

export const changeUserEmailValidation = (state) => {
  const schema = Joi.object().keys({
    currentPassword: Joi.string().min(6).required()
      .error(new Error('Please Enter you password')),
    email: Joi.string().email().min(3).max(30).required()
      .error(new Error('Please Enter you email'))
  });

  const result = Joi.validate(state, schema);
  if (result.error === null) {
    return 'good';
  }
  return result.error.message;
};

export const changeUserPassValidation = (state) => {
  const schema = Joi.object().keys({
    curPassword: Joi.string().min(6).required()
      .error(new Error('Please Enter you password')),
    newPassword: Joi.string().min(6).required()
      .error(new Error('Please Enter you password')),
  });

  const result = Joi.validate(state, schema);
  if (result.error === null) {
    return 'good';
  }
  return result.error.message;
};
