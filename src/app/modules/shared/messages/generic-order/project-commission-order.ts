import {VideoTemplate} from "../video-template/video-template";
import {GenericOrder} from "./generic-order";

export interface ProjectCommissionOrder extends GenericOrder{
  projectId: number;
}
