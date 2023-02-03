"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var path_1 = require("path");
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].static(path_1["default"].join(__dirname, 'public')));
app.get("/api", function (req, res, next) {
    res.json({ message: "Hello from server!" });
});
app.listen(3000, function () { return console.log('server up and running'); });
