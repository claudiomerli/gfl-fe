import {Customer} from "./customer";
import {Newspaper} from "./newspaper";

export enum ProjectStatus {
    CREATED = "Creato",
    WORKING = "In Lavorazione",
    TO_BE_PUBLISHED = "Da Pubblicare", // (quanto tutti gli articoli stanno in TO_BE_PUBLISHED)
    TERMINATED = "Terminato", // (quando tutti gli articoli stanno in PUBLISHED)
    INVOICED = "Fatturato"
}

export class Project {
    id: number | undefined;
    name: string | undefined;
    customer: Customer | undefined;
    newspaper: Newspaper | undefined;
    createdDate: string | undefined;
    lastModifiedDate: string | undefined;
    status?: ProjectStatus;

    get nextState(): String | undefined {
        switch (this.status) {
            case ProjectStatus.CREATED:
                return "WORKING";
            case ProjectStatus.WORKING:
                return "TO_BE_PUBLISHED";
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
    }
}
