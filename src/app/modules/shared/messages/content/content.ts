import {User} from "../auth/user";
import {ProjectCommission} from "../project/project";
import {ContentHint} from "./content-hint";

export interface Content {
  id: number
  body: string
  editor: User
  projectCommission: ProjectCommission
  contentStatus: string
  lastModifiedDate: string;
  hint: ContentHint;
  isDomainContent: boolean,
  wordpressId: string,
  wordpressUrl: string,
  wordpressPublicationDate: string
  wordpressCategories: { categoryId: number }[]
}
