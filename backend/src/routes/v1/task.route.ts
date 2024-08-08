import express from "express";
import { createValidation, updateValidation } from '../../validations/task.validation';
import { validate } from "../../utils/validation";
import controller from "../../controllers/task.controller";

const router = express.Router();

/**
 * @swagger
 * /v1/tasks:
 *   get:
 *     summary: filter tasks
 *     tags: [Sample]
 */
router.route("/").get(controller.filter);

/**
 * @swagger
 * /v1/tasks:
 *   post:
 *     summary: Create task entity
 *     tags: [Sample]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 */
router.route("/").post(validate(createValidation), controller.create);

/**
 * @swagger
 * /v1/tasks/change_status:
 *   post:
 *     summary: Change status task entities
 *     tags: [Sample]
 */
router.route("/change_status").post(controller.batchChangeItemsStatus);

/**
 * @swagger
 * /v1/tasks/clear_completed_items:
 *   post:
 *     summary: Clear completed task entities
 *     tags: [Sample]
 */
router.route("/clear_completed_items").post(controller.clearCompletedItems);

/**
 * @swagger
 * /v1/tasks/{id}:
 *   delete:
 *     summary: Delete task entity
 *     tags: [Sample]
 */
router.route("/:id").delete(controller.destroy);

/**
 * @swagger
 * /v1/tasks/{id}:
 *   put:
 *     summary: Update task entity
 *     tags: [Sample]
 */
router.route("/:id").put(validate(updateValidation), controller.update);
export default router;
