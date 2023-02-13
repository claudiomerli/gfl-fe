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
  assignDate: string,
  wordpressId: string,
  wordpressUrl: string,
  wordpressPublicationDate: string
  wordpressFeaturedMediaUrl: string
  wordpressFeaturedMediaId: number
  wordpressCategories: { categoryId: number }[]
}
