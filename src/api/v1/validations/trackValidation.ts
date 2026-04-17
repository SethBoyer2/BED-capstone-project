import Joi from "joi";

// fields option, require 1 field, trim spaces, treat "" as empty so it isn't misconstrued as data

/**
 * @openapi
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         album:
 *           type: string
 *           maxLength: 80
 *           description: Name of the album
 *           example: "Graduation"
 *         artist:
 *           type: string
 *           maxLength: 80
 *           description: Name of the artist
 *           example: "Kanye West"
 *         title:
 *           type: string
 *           description: Title of the song
 *           example: "Can't tell me nothing"
 *         length:
 *           type: string
 *           format: "mm:ss"
 *           description: Length of the song
 *           example: "4:31"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the metadata was created
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the metadata was last updated
 *           example: "2024-01-20T14:45:00Z"
 */
export const itemSchemas = {
  create: {
    body: Joi.object({
      artist: Joi.string()
      .optional()
      .trim()
      .empty("")
      .max(80)
      .messages({
            "number.max": "Artist name must be 80 characters or less"
      }),

      album: Joi.string()
      .optional()
      .trim()
      .empty("")
      .max(80)
      .messages({
            "number.max": "Album name must be 80 characters or less"
      }),

      title: Joi.string()
        .optional()
        .trim()
        .max(80)
        .empty("")
        .messages({
            "number.max": "Title must be 80 characters or less"
        }),

      // IMPORTANT: Figure out how to disallow the length field if no other field is present.
      length: Joi.string()
        .optional()
        .trim()
        .empty("")
        .pattern(/^[0-5][0-9]:[0-5][0-9]$/) // regex for mm:ss format, enforces 0-5 for tens to avoid lengths like "142:9823"
        .messages({
          "string.pattern.base": "Song length must be in mm:ss format. (ex. 3:23)",
        }),
    }).min(1).messages({
        "number.min": "Must provide at least one field for your metadata to be processed."
    }), // require at least ONE field to be provided
  },

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "The email field is required"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "email"
 *               issue:
 *                 type: string
 *                 example: "must be a valid email address"
 *           description: Detailed validation errors (optional)
 */

  getById: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Item ID is required",
        "string.empty": "Item ID cannot be empty",
      }),
    }),
  },
};
