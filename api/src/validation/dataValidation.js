import Joi from 'joi';

export const newUserSchema = Joi.object({
  firstName: Joi.string().alphanum().max(50).required(),

  lastName: Joi.string().alphanum().max(50).required(),

  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(
    new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,20}$',
    ),
  ),

  repeatPassword: Joi.ref('password'),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),
});

export const postSchema = Joi.object({
  title: Joi.string().max(50).required(),

  body: Joi.string().required(),

  category: Joi.string().valid('NFL', 'MLB', 'NBA', 'NHL').required()
});

export default schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.statusCode = 422;
      // console.log('error --> ', error);
      next(error);
    } else {
      next();
    }
  };
};
