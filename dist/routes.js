"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
exports.router = router;
let users = [{ id: 1, name: 'John' }, { id: 2, name: 'Allyson' }];
router.get('/users', (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.OK).send(users);
});
router.get('/users/:uuid', (req, res, next) => {
    const { id } = req.params;
    const finduser = users.find(user => user.id === Number(id));
    if (!finduser)
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            error: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        });
    res.status(http_status_codes_1.StatusCodes.OK).send(finduser);
});
router.post('/users', (req, res, next) => {
    const { id, name } = req.body;
    if (!id || !name)
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            error: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE)
        });
    const findUser = users.find(user => user.id === Number(id));
    if (findUser)
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            error: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.CONFLICT)
        });
    users.push({ id, name });
    res.status(http_status_codes_1.StatusCodes.OK).send(users);
});
router.put('/users/:id', (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!id)
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            error: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE)
        });
    const findUser = users.find(user => user.id === Number(id));
    if (!findUser)
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            error: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND)
        });
    const newArray = users.map(user => {
        if (user.id === Number(id)) {
            return {
                id: Number(id),
                name
            };
        }
        return user;
    });
    users = newArray;
    res.status(http_status_codes_1.StatusCodes.OK).send(users);
});
