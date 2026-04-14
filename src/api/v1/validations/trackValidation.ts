// import Joi from "joi";

// Probably wouldn't be a bad idea to add some more metadata fields.
// Currenty nothing good to showcase Joi validation as all fields ARE optional

// export const itemSchemas = {
//   create: {
//     body: Joi.object({
//       artist: Joi.string().optional().min(1).max(50).messages({
//         "any.required": "Name is required",
//         "string.empty": "Name cannot be empty.",
//       }),

//       album: Joi.string().optional().messages({
//         "any.required": "Date is required.",
//         "date.empty": "Date cannot be empty.",
//         "date.greater": "The event date must be in the future."
//       }),

//       title: Joi.string()
//         .optional()
//         .messages({
//           "any.required": "Status is required",
//           "string.empty": "Status cannot be empty",
//           "any.only": "Status must be Active, Cancelled, Completed or postponed.",
//         }),

//       length: Joi.string()
//         .optional()
//         .min(0)
//         .max(Joi.ref("capacity"))
//         .messages({
//           "number.max": "Registration Count cannot exceed event capacity",
//         }),
//     }),
//   },

//   getById: {
//     params: Joi.object({
//       id: Joi.string().required().messages({
//         "any.required": "Item ID is required",
//         "string.empty": "Item ID cannot be empty",
//       }),
//     }),
//   },
// };
