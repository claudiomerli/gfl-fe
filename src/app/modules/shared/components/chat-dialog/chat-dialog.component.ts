import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SearchMessageDTO} from "../../messages/message/search-message.dto";
import {MessageService} from "../../services/message.service";
import {Message} from "../../messages/message/message";
import {PageResponseDto} from "../../messages/common/page-response.dto";
import {FormControl, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";

interface MessageWrapper extends Message {
  mine: boolean
}

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})

export class ChatDialogComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private store: Store,
    public dialogRef: MatDialogRef<ChatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchMessageDTO,
  ) {
  }

  messages?: PageResponseDto<MessageWrapper>

  sendMessageControl = new FormControl<string>("", Validators.required);

  ngOnInit(): void {
    this.fetchMessage()
  }

  fetchMessage() {
    let me = this.store.selectSnapshot(AuthenticationState.user);
    this.messageService.searchMessages({
      participant1Role: this.data.participant1Role,
      participant1UserId: this.data.participant1UserId,
      participant2Role: this.data.participant2Role,
      participant2UserId: this.data.participant2UserId,
      topicId: this.data.topicId,
      topicType: this.data.topicType
    }, {page: 0, pageSize: 10000, sortBy: "timestamp", sortDirection: "DESC"})
      .subscribe(messages => {
        this.messages = {
          content: messages.content.map(value => ({
            ...value,
            mine: value.sourceUser?.id === me?.id || value.sourceRole === me?.role
          })).reverse(),
          pageable: messages.pageable,
          totalElements: messages.totalElements
        }
      })
  }


  sendMessage() {
    const value = this.sendMessageControl.value;
    this.sendMessageControl.setValue("")
    const message = {
      message: value!,
      topicId: this.data.topicId,
      topicType: this.data.topicType,
      targetRole: this.data.participant2Role,
      targetUserId: this.data.participant2UserId,
    };
    this.messageService.saveMessage(message).subscribe(() => {
      this.fetchMessage()
    })
  }
}
