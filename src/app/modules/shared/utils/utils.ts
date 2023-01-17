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
  {code: 'CHIEF_EDITOR', label: 'Capo redattore'},
  {code: 'EDITOR', label: 'Redattore'},
  {code: 'PUBLISHER', label: 'Pubblicatore'},
  {code: 'ADMINISTRATION', label: 'Amministrazione fatturazione'},
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
  {label: 'GENNAIO', code: 'GENNAIO'},
  {label: 'FEBBRAIO', code: 'FEBBRAIO'},
  {label: 'MARZO', code: 'MARZO'},
  {label: 'APRILE', code: 'APRILE'},
  {label: 'MAGGIO', code: 'MAGGIO'},
  {label: 'GIUGNO', code: 'GIUGNO'},
  {label: 'LUGLIO', code: 'LUGLIO'},
  {label: 'AGOSTO', code: 'AGOSTO'},
  {label: 'SETTEMBRE', code: 'SETTEMBRE'},
  {label: 'OTTOBRE', code: 'OTTOBRE'},
  {label: 'NOVEMBRE', code: 'NOVEMBRE'},
  {label: 'DICEMBRE', code: 'DICEMBRE'}
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
  {label: 'Approvato', code: 'APPROVED'}
]

export const projectCommissionStatus = [
  {label: 'Creato', code: 'CREATED', roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR']},
  {label: 'Avviato', code: 'STARTED', roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR']},

  {label: 'Assegnato', code: 'ASSIGNED', roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR']},
  {label: 'Stand By - Redazione', code: 'STANDBY_EDITORIAL', roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR']},
  {label: 'Da pubblicare', code: 'TO_PUBLISH', roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'PUBLISHER']},

  {
    label: 'Inviato alla testata',
    code: 'SENT_TO_NEWSPAPER',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'PUBLISHER']
  },
  {
    label: 'Stand By - Pubblicazione',
    code: 'STANDBY_PUBLICATION',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'PUBLISHER']
  },
  {
    label: 'Inviato in amministrazione',
    code: 'SENT_TO_ADMINISTRATION',
    roleCanView: ['CUSTOMER', 'ADMIN', 'CHIEF_EDITOR', 'PUBLISHER']
  },
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
