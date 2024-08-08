import express from "express";
import { createValidation } from "../../validations/sample.validation";
import { validate } from "../../utils/validation";
import controller from "../../controllers/sample.controller";

const router = express.Router();

/**
 * @swagger
 * /v1/samples:
 *   post:
 *     summary: Create sample entity
 *     tags: [Sample]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#components/schemas/SamplePost"
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/schemas/SamplePost"
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/responses/Error"
 *             example:
 *               code: 400
 *               message: "Validation Error"
 *               errors: [
 *                {
 *                  "field": "name",
 *                  "location": "body",
 *                  "messages": [
 *                      "\"name\" is required"
 *                  ],
 *                  "types": [
 *                    "any.required"
 *                  ]
 *                 },
 *                 {
 *                  "field": "slug",
 *                  "location": "body",
 *                  "messages": [
 *                      "\"slug\" is required"
 *                  ],
 *                  "types": [
 *                    "any.required"
 *                  ]
 *                 }
 *               ]
 */
router.route("/").post(validate(createValidation), controller.create);

export default router;
