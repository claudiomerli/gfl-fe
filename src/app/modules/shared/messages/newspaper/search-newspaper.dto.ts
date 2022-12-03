
export class SearchNewspaperDto {

  name?: string;
  id?: string;
  zaFrom?: string;
  zaTo?: string;
  purchasedContentFrom?: string;
  purchasedContentTo?: string;
  leftContentFrom?: string;
  leftContentTo?: string;
  costEachFrom?: string;
  costEachTo?: string;
  costSellFrom?: string;
  costSellTo?: string;
  regionalGeolocalization?: string;
  topics?: Array<string>;
  hidden?: boolean;
  sensitiveTopics?: boolean;
}
