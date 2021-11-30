import {Customer} from "./customer";
import {Newspaper} from "./newspaper";
import {Validators} from "@angular/forms";

export enum ProjectStatus {
  CREATED = "Creato",
  SENT = "Inviato al capo redattore",
  WORKING = "In Lavorazione",
  TO_BE_PUBLISHED = "Da Pubblicare", // (quanto tutti gli articoli stanno in TO_BE_PUBLISHED)
  TERMINATED = "Terminato", // (quando tutti gli articoli stanno in PUBLISHED)
  INVOICED = "Fatturato"
}

export class ProjectContentPreview {
  contentId: number | undefined;
  id: number | undefined;
  newspaper: Newspaper | undefined;
  monthUse: string | undefined;
  linkUrl: string | undefined;
  linkText: string | undefined;
  title: string | undefined;
  customerNotes: string | undefined;
}

export class Project {
  id: number | undefined;
  name: string | undefined;
  customer: Customer | undefined;
  newspaper: Newspaper | undefined;
  createdDate: string | undefined;
  lastModifiedDate: string | undefined;
  status: ProjectStatus;
  projectContentPreviews: Array<ProjectContentPreview> | undefined;

  get nextState(): String | undefined {
    switch (this.status) {
      case ProjectStatus.CREATED:
        return "WORKING";
      case ProjectStatus.WORKING:
        return "TO_BE_PUBLISHED";
      case ProjectStatus.TO_BE_PUBLISHED:
        return "TERMINATED"
      case ProjectStatus.TERMINATED:
        return "INVOICED"
      default:
        return undefined
    }
  }

  get nextStateProject(): String | undefined {
    switch (this.status) {
      case ProjectStatus.CREATED:
        return ProjectStatus.SENT;
      case ProjectStatus.SENT:
        return ProjectStatus.WORKING;
      case ProjectStatus.WORKING:
        return ProjectStatus.TO_BE_PUBLISHED;
      case ProjectStatus.TO_BE_PUBLISHED:
        return ProjectStatus.TERMINATED
      case ProjectStatus.TERMINATED:
        return ProjectStatus.INVOICED
      default:
        return undefined
    }
  }

  constructor(item: any) {
    this.id = item.id;
    this.name = item.name;
    this.customer = item.customer;
    this.newspaper = item.newspaper;
    this.createdDate = item.createdDate;
    this.lastModifiedDate = item.lastModifiedDate;
    this.status = ProjectStatus[item.status as keyof typeof ProjectStatus]
    this.projectContentPreviews = item.projectContentPreviews;
  }
}
