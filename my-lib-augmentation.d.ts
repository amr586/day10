import "./my-lib"; 

declare module "./my-lib" {
  export function log(
    message: string,
    level?: "info" | "warn" | "error"
  ): void;
}
