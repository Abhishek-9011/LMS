"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/generateToken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "fill all the details",
            });
        }
        const existingUser = yield user_model_1.User.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "user with this email already exist",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield user_model_1.User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.json({
            success: true,
            message: "user registerd successfully",
        });
    }
    catch (e) {
        res.json({
            success: false,
            message: "some error occured" + e,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.json({
                success: false,
                message: "fill all details correctly"
            });
        }
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            res.json({
                success: false,
                message: "incorrect email or password"
            });
        }
        const isPasswordMatch = bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordMatch) {
            res.json({
                success: false,
                message: "incorrect email or password"
            });
        }
        (0, generateToken_1.generateToken)(res, user, `Welcome back ${user === null || user === void 0 ? void 0 : user.name}`);
    }
    catch (error) { }
});
exports.login = login;
