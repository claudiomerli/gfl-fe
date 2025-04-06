import {User} from "../auth/user";

export class Message {
  id?: number;
  message?: string;
  sourceRole?: string;
  sourceUser?: User;
  targetRole?: string;
  targetUser?: User;
  timestamp?: string;
  read?: boolean;
  topicId?: string;
  topicType?: string;
}
