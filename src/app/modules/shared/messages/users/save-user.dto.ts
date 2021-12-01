import {EditUserDto} from "./edit-user.dto";

export class SaveUserDto extends EditUserDto {
  username: string | undefined;
}
