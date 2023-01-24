import {Attachment} from "../common/attachment";

export interface ContentHint {
  id: number
  body: string
  attachments: Attachment[]
}
