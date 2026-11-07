import { HttpError } from "./HttpError.js";

export class UserNotFound extends HttpError {
  constructor(identifier: string | number) {
    super(404, `User with The the identifier : ${identifier} is not found.`);
  }
}
