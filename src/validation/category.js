import Joi from "joi";

const categorySchema = Joi.object(
  {
    _id: Joi.string(),
    name: Joi.string().required(),
  },
  { timestamps: true, versionKey: false }
);

export default categorySchema;
