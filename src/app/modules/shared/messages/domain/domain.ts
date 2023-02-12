import {Hosting} from "../hosting/hosting";
import {Newspaper} from "../newspaper/newspaper";

export interface Domain {

  id: number;
  name: string;
  wordpressUsername: string;
  wordpressPassword: string;
  ip: string;
  expiration: string;
  hosting: Hosting;
  newspaper: Newspaper;

}
