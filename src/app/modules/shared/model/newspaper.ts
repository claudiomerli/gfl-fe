export class Newspaper {

  id: number | undefined
  name: string | undefined
  purchasedContent: number | undefined
  costEach: number | undefined
  email: string | undefined
  regionalGeolocalization: string | undefined
  topic: "NEWS" | "LOCAL_NEWSPAPER" | "HEALTH" | "ECONOMY" | "NO_TOPIC" = "NO_TOPIC"

}
