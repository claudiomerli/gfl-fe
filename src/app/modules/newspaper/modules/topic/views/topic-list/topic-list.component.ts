import {Component, OnInit} from '@angular/core';
import {TopicService} from "../../../../../shared/services/topic.service";
import {Topic} from "../../../../../shared/messages/newspaper/topic";
import {FormControl, Validators} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {


  constructor(private topicService: TopicService) {
  }


  formControls: FormControl<string | null>[] = [];
  topics: Topic[] = []

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.topicService.findAll().subscribe(value => {
      this.formControls = value.map(t => {
        let formControl = new FormControl<string>(t.name!, Validators.required);
        formControl.valueChanges.pipe(debounceTime(500))
          .subscribe((change) => {
            if (!!change && change !== "") {
              this.topicService.update(t.id, {
                name: change!
              }).subscribe()
            }
          })
        return formControl
      })
      this.formControls.push(new FormControl('', Validators.required))
      this.topics = value
    });
  }


  save(i: number) {
    this.topicService.save({
      name: this.formControls[i].value!
    }).subscribe(() => this.fetch())
  }

  delete(i: number) {
    this.topicService.delete(this.topics[i].id).subscribe(() => this.fetch(), error => {
      this.formControls[i].markAsDirty()
      this.formControls[i].markAsTouched()
      this.formControls[i].setErrors({
        cannotDelete: true
      })
    })
  }
}
