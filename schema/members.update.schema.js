import Joi from "joi"

export default Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    password: Joi.string()
        .min(6),
    interests: Joi.array()
        .items(Joi.string()
        .valid('Research', 'Teaching', 'Career Guidance', 'Charity and Social Work', 'Organizing Events')),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    description: Joi.string()
        .max(1000),
    address: Joi.object({
        street: Joi.string(),
        city: Joi.string()
            .required(),
        state: Joi.string()
            .valid("AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY")
            .required(),
        zipcode: Joi.number()
            .integer()
            .required()
    })
})
