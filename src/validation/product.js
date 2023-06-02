import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required().min(5),
    price: Joi.number().required(),
    image: Joi.string(),
    description: Joi.string(),
    categoryId: Joi.string().required(),
})

export default productSchema