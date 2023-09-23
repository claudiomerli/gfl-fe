import {VideoTemplate} from "../video-template/video-template";
import {GenericOrder} from "./generic-order";

export interface VideoOrder extends GenericOrder{
  videoTemplate: VideoTemplate;
  fields: VideoOrderField[];
}

export interface VideoOrderField {
  id: number;
  name: string;
  value: string;
}
