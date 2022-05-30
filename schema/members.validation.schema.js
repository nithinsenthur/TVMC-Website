import Joi from "joi"

export default Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
    class: Joi.number()
        .integer()
        .min(1900)
        .max(2050),
    specialty: Joi.string()
        .valid("Placeholder1", "Placeholder2", "Placeholder3", "Placeholder4", "Placeholder5"), 
    role: Joi.string()
        .valid('Student', 'Physician', 'Trainee', 'Guest'),
    interests: Joi.array()
        .items(Joi.string()
        .valid('Research', 'Teaching', 'Career Guidance', 'Charity and Social Work', 'Organizing Events')),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
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

