import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AssistantMessage} from "../../../shared/messages/content/assistant";
import {FormControl} from "@angular/forms";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {User} from "../../../shared/messages/auth/user";
import {ContentService} from "../../../shared/services/content.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-content-assistant-dialog',
  templateUrl: './content-assistant-dialog.component.html',
  styleUrls: ['./content-assistant-dialog.component.scss']
})
export class ContentAssistantDialogComponent implements OnInit {

  key = "CONVERSATION"

  messages: AssistantMessage[] = [];
  message = new FormControl<string>("");
  user: User | undefined;

  @ViewChild("chatView") chatView!: ElementRef;
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<ContentAssistantDialogComponent>,
    private store: Store,
    private contentService: ContentService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    let messages = localStorage.getItem(this.key);
    if (messages) {
      this.messages = JSON.parse(messages);
    }

    this.user = this.store.selectSnapshot(AuthenticationState.user);
    this.scrollToBottom()
    this.spinner.show("messageSpinner")
  }

  send() {
    let messageToSend = this.message.value?.trim();
    if (messageToSend != "") {
      this.addMessageToMessages({
        content: messageToSend!,
        role: "user"
      })

      this.isLoading = true
      this.contentService.sendAssistantMessage({
        messages: this.messages
      }).subscribe(response => {
        this.isLoading = false
        this.addMessageToMessages(response.choices[0].message)
      }, () => {
        this.isLoading = false
      })
    }
  }

  addMessageToMessages(message: AssistantMessage) {
    this.messages.push(message)
    this.message.setValue("")
    localStorage.setItem(this.key, JSON.stringify(this.messages))
    this.scrollToBottom()
  }

  scrollToBottom() {
    setTimeout(() => {
      let nativeElement = this.chatView.nativeElement;
      nativeElement.scroll({top: nativeElement.scrollHeight})
    }, 100)

  }


  copyContent(message: AssistantMessage) {
    navigator.clipboard.writeText(message.content);
    this.snackBar.open("Contenuto copiato!",'OK', {
      duration: 1000
    })
  }
}
