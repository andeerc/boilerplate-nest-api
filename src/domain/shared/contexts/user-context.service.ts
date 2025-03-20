import { Injectable, Scope } from "@nestjs/common";
import { UserDto } from "../../users/dto/user.dto";

@Injectable({
  scope: Scope.REQUEST
})
export class UserContextService {
  private _user: UserDto;

  setUser(user: any) {
    this._user = user;
  }

  get user() {
    return this._user;
  }
}