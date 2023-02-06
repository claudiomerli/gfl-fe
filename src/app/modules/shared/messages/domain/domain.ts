import {Hosting} from "../hosting/hosting";

export interface Domain {

  id: number;
  name: string;
  wordpressUsername: string;
  wordpressPassword: string;
  ip: string;
  expiration: string;
  hosting: Hosting;

}
