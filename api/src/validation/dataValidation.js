import Joi from 'joi';

export const newUserSchema = Joi.object({
  firstName: Joi.string().alphanum().max(50).required(),

  lastName: Joi.string().alphanum().max(50).required(),

  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,20}$',
      ),
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password must be between 8 and 20 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),

  repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Repeat password must match password',
    'any.required': 'Repeat password is required',
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});

export const postSchema = Joi.object({
  title: Joi.string().max(50).required(),

  body: Joi.string().required(),

  category: Joi.string().valid('NFL', 'MLB', 'NBA', 'NHL').required(),
});

export const commentsSchema = Joi.object({
  title: Joi.string().max(50).required(),

  body: Joi.string().required(),

  postId: Joi.number().integer().positive().required(),
});

export const validate = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.statusCode = 422;
      console.log('error --> ', error);
      next(error);
    } else {
      next();
    }
  };
};
