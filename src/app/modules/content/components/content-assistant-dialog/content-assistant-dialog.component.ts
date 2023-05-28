import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AssistantMessage} from "../../../shared/messages/content/assistant";

@Component({
  selector: 'app-content-assistant-dialog',
  templateUrl: './content-assistant-dialog.component.html',
  styleUrls: ['./content-assistant-dialog.component.scss']
})
export class ContentAssistantDialogComponent implements OnInit {

  key = "CONVERSATION"

  messages : AssistantMessage[] = [];

  constructor(
    public dialogRef: MatDialogRef<ContentAssistantDialogComponent>
  ) {
  }

  ngOnInit(): void {
    let messages = localStorage.getItem(this.key);
    if(messages){
      messages = JSON.parse(messages);
    }
  }

}
