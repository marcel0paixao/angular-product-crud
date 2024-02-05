import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-animations-dialog',
  templateUrl: './dialog-animations.component.html',
})
export class DialogAnimationsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.confirmAction = data.confirmAction;
    this.cancelAction = data.cancelAction;
  }

  title: string = this.data.title;
  subtitle: string = this.data.subtitle;
  confirmLabel: string = this.data.confirmLabel;
  cancelLabel: string = this.data.cancelLabel;
  confirmAction: Function;
  cancelAction: Function;
}