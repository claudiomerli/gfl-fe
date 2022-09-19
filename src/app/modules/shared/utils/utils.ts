export function clean(obj: any) {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj
}

export const projectStatuses = [
  {code: 'CREATED', label: "Creato"},
  {code: 'ASSIGNED', label: "Assegnato"},
  {code: 'WORKING', label: "In lavorazione"},
  {code: 'TO_BE_PUBLISHED', label: "Da pubblicare"},
  {code: 'TERMINATED', label: "Terminato"},
  {code: 'INVOICED', label: "Fatturato"},
]


export const userRoles = [
  {code: 'ADMIN', label: 'Amministratore'},
  {code: 'CUSTOMER', label: 'Cliente'},
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
]

export const orderStatus = [
  {label: 'Bozza', code: 'DRAFT'},
  {label: "Richiesto", code: 'REQUESTED'},
  {label: 'Confermato', code: 'CONFIRMED'},
  {label: 'Respinto', code: 'CANCELED'}
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
