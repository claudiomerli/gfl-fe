import {ValidatorFn} from "@angular/forms";

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
  {code: 'CREATED', label: "Creato"},
  {code: 'PUBLISHED', label: "Pubblicato"},
  {code: 'CLOSED', label: "Concluso"},
]


export const userRoles = [
  {code: 'ADMIN', label: 'Amministratore'},
  {code: 'CUSTOMER', label: 'Cliente'},
  {code: 'CHIEF_EDITOR', label: 'Capo redattore'},
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


export const projectCommissionStatus = [
  {label: 'Creato', code: 'CREATED'},
  {label: 'Avviato', code: 'STARTED'},
  {label: 'Da pubblicare', code: 'TO_PUBLISH'},
  {label: 'Pubblicato', code: 'PUBLISHED'},
]


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
