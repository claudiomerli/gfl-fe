import {Component, OnInit} from '@angular/core';
import {videoTemplateType} from "../../../shared/utils/utils";
import {VideoTemplateService} from "../../../shared/services/video-template.service";
import {VideoTemplate} from "../../../shared/messages/video-template/video-template";
import {SaveVideoTemplateDto} from "../../../shared/messages/video-template/save-video-template.dto";

@Component({
  selector: 'app-video-template-dashboard',
  templateUrl: './video-template-dashboard.component.html',
  styleUrls: ['./video-template-dashboard.component.scss']
})
export class VideoTemplateDashboardComponent implements OnInit {

  protected readonly videoTemplateType = videoTemplateType;
  videoTemplates: VideoTemplate[] = [];


  constructor(private videoTemplateService: VideoTemplateService) {
  }

  getVideoTemplateByType(type: string) {
    return this.videoTemplates.filter(value => value.type === type);
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.videoTemplateService.getAllVideoTemplates().subscribe(value => {
      this.videoTemplates = value;
    })
  }


  addTemplate(code: string) {
    this.videoTemplateService.createVideoTemplate({
      type: code
    }).subscribe(() => {
      this.load()
    })
  }

  onDelete(id: number) {
    this.videoTemplateService.deleteVideoTemplate(id).subscribe(() => {
      this.load()
    })

  }

  onSave(id: number, event: SaveVideoTemplateDto) {
    this.videoTemplateService.updateVideoTemplate(id, event).subscribe(() => {
      this.load()
    })
  }
}
