"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_lib_1 = require("./my-lib");
(0, my_lib_1.log)("Hello");
(0, my_lib_1.log)("Something wrong", "warn");
const message = "Hello";
console.log(message);
function getArea(shape) {
    if (shape.kind === "circle")
        return Math.PI * shape.radius * shape.radius;
    if (shape.kind === "square")
        return shape.side * shape.side;
    if (shape.kind === "rectangle")
        return shape.width * shape.height;
    return 0;
}
console.log(getArea({ kind: "circle", radius: 5 }));
console.log(getArea({ kind: "square", side: 4 }));
console.log(getArea({ kind: "rectangle", width: 3, height: 6 }));
//5
function merge(obj1, obj2) {
    return Object.assign(Object.assign({}, obj1), obj2);
}
function getProperty(obj, key) {
    return obj[key];
}
//6
function firstElement(arr) {
    return arr[0];
}
const first = firstElement([1, 2, 3]);
//8
function Controller(route) {
    return function (constructor) {
        constructor.baseRoute = route;
    };
}
function Get(path) {
    return function (target, propertyKey) {
        console.log(`Registering route: ${path}`);
    };
}
let UserController = class UserController {
    getAll() {
        return [];
    }
};
__decorate([
    Get("/list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
UserController = __decorate([
    Controller("/users")
], UserController);
//10
function isPromise(value) {
    return value instanceof Promise;
}
const val = new Promise((resolve) => resolve(42));
if (isPromise(val)) {
    val.then((v) => console.log("Promise resolved with", v));
}
function request(method, url) {
    return Promise.resolve(`${method} request to ${url}`);
}
request("GET", "/users").then(console.log);
function getUserById(id) {
    console.log("Fetching user with ID:", id);
}
const uid = "abc123";
getUserById(uid);
//14
function getAreaExhaustive(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * Math.pow(shape.radius, 2);
        case "square":
            return Math.pow(shape.side, 2);
        case "rectangle":
            return shape.width * shape.height;
        default:
            const _exhaustive = shape;
            return _exhaustive;
    }
}
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, handler) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(handler);
    }
    emit(event, payload) {
        var _a;
        (_a = this.listeners[event]) === null || _a === void 0 ? void 0 : _a.forEach(handler => handler(payload));
    }
}
const emitter = new EventEmitter();
emitter.on("login", (data) => console.log("User logged in:", data.user));
emitter.emit("login", { user: "Ali" });
