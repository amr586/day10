import { log } from "./my-lib";

log("Hello");
log("Something wrong", "warn"); 
const message: string = "Hello";
console.log(message);

//-1
type IsString<T> = T extends string ? "yes" : "no";


type Test1 = IsString<string>;
type Test2 = IsString<number>;   



//2
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
  if (shape.kind === "circle") return Math.PI * shape.radius * shape.radius;
  if (shape.kind === "square") return shape.side * shape.side;
  if (shape.kind === "rectangle") return shape.width * shape.height;
  return 0; 
}

console.log(getArea({ kind: "circle", radius: 5 }));
console.log(getArea({ kind: "square", side: 4 }));
console.log(getArea({ kind: "rectangle", width: 3, height: 6 }));
//3
interface Person {
  id: number;
  name: string;
  age: number;
}

type OptionalPerson = {
  id?: number;
  name?: string;
  age?: number;
};

type NullablePerson = {
  id: number | null;
  name: string | null;
  age: number | null;
};
//4
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

type UserPreview = { id: number; name: string };
type UserWithoutEmail = { id: number; name: string; isAdmin: boolean }; 
type UserUpdate = Partial<User>;

//5
function merge<T, U>(obj1:T, obj2:U):T&U {
  return { ...obj1, ...obj2 };
}

function getProperty<T, K extends keyof T>(obj:T, key:K):T[K] {
  return obj[key];
}

//6
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const first = firstElement([1, 2, 3]);

//7
type Original = { firstName: string; lastName: string };
type Rename = { first_name: string; last_name: string };
//8
function Controller(route: string) {
  return function (constructor: Function) {
    (constructor as any).baseRoute = route;
  };
}

function Get(path: string) {
  return function (target: any, propertyKey: string) {
    console.log(`Registering route: ${path}`);
  };
}

@Controller("/users")
class UserController {
    @Get("/list")
    getAll() {
    return [];
  }
}

//10
function isPromise(value: any): value is Promise<any> {
  return value instanceof Promise;
}
const val = new Promise((resolve) => resolve(42));

if (isPromise(val)) {
  val.then((v) => console.log("Promise resolved with", v));
}

//11
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = `/${string}`;
function request(method: HTTPMethod, url: Endpoint): Promise<string> {
  return Promise.resolve(`${method} request to ${url}`);
}

request("GET", "/users").then(console.log);

//12

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type FirstArg<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never;

type R1 = MyReturnType<() => number>;  
type A1 = FirstArg<(name: string, age: number) => void>;

//13
type UserID = string & { readonly brand: unique symbol };

function getUserById(id: UserID) {
  console.log("Fetching user with ID:", id);
}

const uid = "abc123" as UserID;
getUserById(uid);
//14
function getAreaExhaustive(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

//15
type Events = {
  login: { user: string };
  logout: undefined;
  message: { text: string };
};

class EventEmitter {
  private listeners: {
    [K in keyof Events]?: Array<(payload: Events[K]) => void>;
  } = {};

  on<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(handler);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    this.listeners[event]?.forEach(handler => handler(payload));
  }
}

const emitter = new EventEmitter();
emitter.on("login", (data) => console.log("User logged in:", data.user));
emitter.emit("login", { user: "Ali" });
