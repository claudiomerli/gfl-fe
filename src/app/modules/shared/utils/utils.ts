import {ValidatorFn} from "@angular/forms";
import * as moment from "moment";


export function clean(obj: any) {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj
}

export const validateObject: ValidatorFn = control => {
  if (!(typeof control.value === "object")) {
    return {wrongType: "Option not selected"}
  }
  return null
}

export const projectStatuses = [
  {code: 'CREATED', label: "In corso"},
  {code: 'SENT_TO_ADMINISTRATION', label: "Inviato in amministrazione"},
  {code: 'INVOICED', label: "Fatturato"},
]


export const userRoles = [
  {code: 'ADMIN', label: 'Amministratore'},
  {code: 'CUSTOMER', label: 'Cliente'},
  {code: 'FINAL_CUSTOMER', label: 'Cliente finale'},
  {code: 'CHIEF_EDITOR', label: 'Capo redattore'},
  {code: 'EDITOR', label: 'Redattore'},
  {code: 'PUBLISHER', label: 'Pubblicatore'},
  {code: 'ADMINISTRATION', label: 'Amministrazione fatturazione'},
  {code: 'INTERNAL_NETWORK', label: 'Network interno'},
]

export const regionalGeolocalizzation = [
  {label: "Generalista", code: "Generalista"},
  {label: "Abruzzo", code: "Abruzzo"},
  {label: "Basilicata", code: "Basilicata"},
  {label: "Calabria", code: "Calabria"},
  {label: "Campania", code: "Campania"},
  {label: "Emilia-Romagna", code: "EmiliaRomagna"},
  {label: "Friuli Venezia Giulia", code: "FriuliVeneziaGiulia"},
  {label: "Lazio", code: "Lazio"},
  {label: "Liguria", code: "Liguria"},
  {label: "Lombardia", code: "Lombardia"},
  {label: "Marche", code: "Marche"},
  {label: "Molise", code: "Molise"},
  {label: "Piemonte", code: "Piemonte"},
  {label: "Puglia", code: "Puglia"},
  {label: "Sardegna", code: "Sardegna"},
  {label: "Sicilia", code: "Sicilia"},
  {label: "Toscana", code: "Toscana"},
  {label: "Trentino-Alto Adige", code: "TrentinoAltoAdige"},
  {label: "Umbria", code: "Umbria"},
  {label: "Valle d'Aosta", code: "ValleDAosta"},
  {label: "Veneto", code: "Veneto"},
  {label: "Verticali", code: "Verticali"},
  {label: "Agenzie di stampa", code: "AgenzieDiStampa"},
  {label: "Inglese", code: "Inglese"},
  {label: "Francese", code: "Francese"},
  {label: "Spagnolo", code: "Spagnolo"},
  {label: "Tedesco", code: "Tedesco"},
  {label: "Svizzera", code: "Svizzera"},
]

export const periods = [
  {label: 'GENNAIO', code: 'JANUARY'},
  {label: 'FEBBRAIO', code: 'FEBRUARY'},
  {label: 'MARZO', code: 'MARCH'},
  {label: 'APRILE', code: 'APRIL'},
  {label: 'MAGGIO', code: 'MAY'},
  {label: 'GIUGNO', code: 'JUNE'},
  {label: 'LUGLIO', code: 'JULY'},
  {label: 'AGOSTO', code: 'AUGUST'},
  {label: 'SETTEMBRE', code: 'SEPTEMBER'},
  {label: 'OTTOBRE', code: 'OCTOBER'},
  {label: 'NOVEMBRE', code: 'NOVEMBER'},
  {label: 'DICEMBRE', code: 'DECEMBER'}
]

export const orderStatus = [
  {label: 'Bozza', code: 'DRAFT'},
  {label: "Richiesto", code: 'REQUESTED'},
  {label: 'Confermato', code: 'CONFIRMED'},
  {label: 'Respinto', code: 'CANCELED'}
]

export const contentStatus = [
  {label: 'In lavorazione', code: 'WORKING'},
  {label: 'Inviato al capo redattore', code: 'DELIVERED'},
  {label: 'Inviato al cliente', code: 'SENT_TO_CUSTOMER'},
  {label: 'Approvato', code: 'APPROVED'},
  {label: 'Pubblicato su wordpress', code: 'PUBLISHED_WORDPRESS'}
]

export type ProjectCommissionStatus = {
  icon?: string, notButton?: boolean, label: string, code: string, roleCanView: string[], roleCanEdit: string[], nextStatuses: string[], projectType: ('REGULAR' | 'DOMAIN')[]
}
export const projectCommissionStatus: ProjectCommissionStatus[] = [
  {
    notButton: true,
    label: 'Creato',
    code: 'CREATED',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'INTERNAL_NETWORK'],
    roleCanEdit: ['ADMIN', 'CHIEF_EDITOR', 'INTERNAL_NETWORK'],
    nextStatuses: ['STARTED'],
    projectType: ['REGULAR', 'DOMAIN']
  },
  {
    icon: 'send',
    label: 'Avviato',
    code: 'STARTED',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'INTERNAL_NETWORK'],
    roleCanEdit: ['ADMIN', 'CHIEF_EDITOR', 'INTERNAL_NETWORK'],
    nextStatuses: ['ASSIGNED', 'STANDBY_EDITORIAL'],
    projectType: ['REGULAR', 'DOMAIN']
  },
  {
    icon: 'assignment_turned_in',
    label: 'Assegnato',
    code: 'ASSIGNED',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'INTERNAL_NETWORK'],
    roleCanEdit: ['ADMIN', 'CHIEF_EDITOR', 'INTERNAL_NETWORK'],
    nextStatuses: ['STANDBY_EDITORIAL', 'WORKED'],
    projectType: ['REGULAR', 'DOMAIN']
  },
  {
    icon: 'done',
    label: 'Lavorato',
    code: 'WORKED',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'INTERNAL_NETWORK'],
    roleCanEdit: ['ADMIN', 'CHIEF_EDITOR', 'INTERNAL_NETWORK'],
    nextStatuses: ['TO_PUBLISH', 'STANDBY_EDITORIAL'],
    projectType: ['REGULAR', 'DOMAIN']
  },
  {
    icon: 'front_hand',
    label: 'Stand By - Redazione',
    code: 'STANDBY_EDITORIAL',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'INTERNAL_NETWORK'],
    roleCanEdit: ['ADMIN', 'CHIEF_EDITOR', 'INTERNAL_NETWORK', 'WORKED'],
    nextStatuses: ['ASSIGNED', 'TO_PUBLISH', 'WORKED'],
    projectType: ['REGULAR', 'DOMAIN']
  },
  {
    icon: 'send',
    label: 'Da pubblicare',
    code: 'TO_PUBLISH',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'PUBLISHER', 'INTERNAL_NETWORK'],
    roleCanEdit: ['ADMIN', 'INTERNAL_NETWORK', 'PUBLISHER'],
    nextStatuses: ['SENT_TO_NEWSPAPER', 'STANDBY_PUBLICATION', 'PUBLISHED_INTERNAL_NETWORK'],
    projectType: ['REGULAR', 'DOMAIN']
  },
  {
    icon: 'front_hand',
    label: 'Stand By - Pubblicazione',
    code: 'STANDBY_PUBLICATION',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'PUBLISHER', 'INTERNAL_NETWORK'],
    roleCanEdit: ['ADMIN', 'INTERNAL_NETWORK', 'PUBLISHER'],
    nextStatuses: ['SENT_TO_ADMINISTRATION', 'SENT_TO_NEWSPAPER'],
    projectType: ['REGULAR', 'DOMAIN']
  },
  {
    notButton: true,
    label: 'Pubblicato su network interno',
    code: 'PUBLISHED_INTERNAL_NETWORK',
    roleCanView: ['INTERNAL_NETWORK', 'ADMIN', 'PUBLISHER', 'CHIEF_EDITOR'],
    nextStatuses: [],
    roleCanEdit: [],
    projectType: ['DOMAIN']
  },
  {
    icon: 'outgoing_mail',
    label: 'Inviato alla testata',
    code: 'SENT_TO_NEWSPAPER',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'PUBLISHER'],
    roleCanEdit: ['ADMIN', 'INTERNAL_NETWORK', 'PUBLISHER'],
    nextStatuses: ['SENT_TO_ADMINISTRATION', 'STANDBY_PUBLICATION'],
    projectType: ['REGULAR']
  },
  {
    notButton: true,
    icon: 'public',
    label: 'Inviato in amministrazione',
    code: 'SENT_TO_ADMINISTRATION',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'PUBLISHER'],
    roleCanEdit: ['ADMIN'],
    nextStatuses: ['STANDBY_PUBLICATION', 'SENT_TO_NEWSPAPER'],
    projectType: ['REGULAR']
  }
]

export const getYearList = (): number[] => {
  let years = [];
  for (let i = 2020; i <= moment().add(1, 'year').year(); i++) {
    years.push(i)
  }
  return years;
}

export const getPointerColor = () => {
  return "#3f51b5"
}

export const getSelectionBarColor = () => {
  return "#3f51b5"
}

export const translateCurrency: (value: number) => string = (value) => {
  return value + " €"
}

export const translatePercentage: (value: number) => string = (value) => {
  return value + " %"
}

export const momentDatePatternIso = "YYYY-MM-DD"
