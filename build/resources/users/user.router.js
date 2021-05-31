"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = require("./user.model");
const user_service_1 = require("./user.service");
exports.userRouter = express_1.default.Router();
exports.userRouter.route('/').get(async (res) => {
    const users = await user_service_1.getAllUsersService();
    res.status(200).json(users.map(user_model_1.User.toResponse));
});
exports.userRouter.route('/:id').get(async (req, res) => {
    const userId = req.params['id'];
    const user = await user_service_1.getUserByIdService(userId);
    if (user) {
        const validUser = user;
        res.json(user_model_1.User.toResponse(validUser));
    }
    else
        res.status(404).send('User not found');
});
exports.userRouter.route('/').post(async (req, res) => {
    const user = await user_service_1.createUserService(req.body);
    if (!user)
        res.status(400).send('Bad request');
    else {
        const validUser = user;
        res.status(201).json(user_model_1.User.toResponse(validUser));
    }
});
exports.userRouter.route('/:id').put(async (req, res) => {
    const userId = req.params['id'];
    const user = await user_service_1.updateUserService(userId, req.body);
    if (!user)
        res.status(400).send('Bad request');
    else {
        const validUser = user;
        res.status(200).json(user_model_1.User.toResponse(validUser));
    }
});
exports.userRouter.route('/:id').delete(async (req, res) => {
    const userId = req.params['id'];
    const deletedUser = await user_service_1.deleteUserService(userId);
    if (deletedUser)
        res.status(204).send('User has been deleted');
    else
        res.status(404).send('User not found');
});
