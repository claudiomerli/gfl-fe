import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SettingsService} from "../../../shared/services/settings.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  uiConfig: any = [
    {sectionTitle: "Descrizioni pacchetto secondo livello"},
    {
      field: "SECOND_LEVEL_BASE_DESCRIPTION",
      label: "Secondo livello - Descrizione pacchetto BASE",
      type: "html",
      colspan: 6
    },
    {
      field: "SECOND_LEVEL_PREMIUM_DESCRIPTION",
      label: "Secondo livello - Descrizione pacchetto PREMIUM",
      type: "html",
      colspan: 6
    },
  ]

  formGroup = new FormGroup<any>({});

  constructor(private settingService: SettingsService) {
  }

  ngOnInit(): void {
    this.uiConfig.forEach((value: any) => {
      if (value.field) {
        this.formGroup.addControl(value.field, new FormControl(''))
      }
    })

    this.load()
  }

  load() {
    this.settingService.getSettings()
      .subscribe(value => {
        value.forEach(setting => {
          this.formGroup.controls[setting.code].setValue(setting.value);
        })
      })
  }

  save() {
    let settings = this.formGroup.value;
    forkJoin(Object.keys(settings).map(value => {
      return this.settingService.saveSettings({
        code: value,
        value: settings[value]
      })
    }))
      .subscribe(() => {
        this.load()
      })
  }


}
