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
