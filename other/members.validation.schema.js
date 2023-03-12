import Joi from "joi"

export default Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Joi.string()
        .min(8)
        .max(20)
        .required(),
    class: Joi.number()
        .integer()
        .min(1900)
        .max(2050),
    specialty: Joi.string()
        .valid(
            "Anesthesiology",
            "Dermatology",
            "Radiology",
            "Emergency medicine",
            "Family medicine",
            "Internal medicine",
            "Neurology",
            "Nuclear medicine",
            "Obstetrics and gynecology",
            "Sports Medicine",
            "Ophthalmology",
            "Pathology",
            "Pediatrics",
            "Physical medicine and rehabilitation",
            "Preventive medicine",
            "Psychiatry",
            "Radiation oncology",
            "Medical oncology",
            "Surgery",
            "Nephrology",
            "Endocrinology",
            "Pulmonology",
            "Rheumatology",
            "Gastroenterology",
            "Hematology",
            "Infectious disease",
            "Intensive Care Medicine",
            "General (Surgery)",
            "Gastroenterology (Surgery)",
            "Neurosurgery (Surgery)",
            "Orthopedics (Surgery)",
            "Urology (Surgery)",
            "Hepatobiliary (Surgery)",
            "Colorectal (Surgery)",
            "Vascular (Surgery)",
            "Head and Neck (Surgery)",
            "Cardiothoracic (Surgery)",
            "Cardiology",
            "Interventional Cardiology",
            "Interventional Radiology",
            "Other"
            ),
    institution: Joi.string(),
    role: Joi.string()
        .valid('Student', 'Physician', 'Trainee', 'Guest'),
    interests: Joi.array()
        .items(Joi.string()
        .valid('Research', 'Teaching', 'Career Guidance', 'Charity and Social Work', 'Organizing Events')),
    phone: Joi.string()
        .min(11)
        .max(13)
        .pattern(/^[0-9]+$/)
        .error(new Error("Make sure your phone number is listed without any hyphens and includes the country code (e.g. 12223334444)"))
        .required(),
    address: Joi.object({
        street: Joi.string(),
        city: Joi.string()
            .required(),
        state: Joi.string()
            .valid(
                "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", 
                "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", 
                "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "OT"
                )
            .required(),
        zipcode: Joi.number()
            .integer()
            .required(),
        country: Joi.string()
            .valid("Canada", "United States of America")
            
    })
})

