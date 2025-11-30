import {Component, Inject} from '@angular/core';
import {DetailsService} from '../../../shared/services/details.service';
import {Invitation} from '../../model/invitation.entity';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-invitation-dialog',
  imports: [
    TranslatePipe
  ],
  templateUrl: './invitation-dialog.component.html',
  styleUrl: './invitation-dialog.component.css'
})
export class InvitationDialogComponent {
  invitation: Invitation;

  constructor(
    private detailsService: DetailsService,
    @Inject(MAT_DIALOG_DATA) public data: { invitation: Invitation; },
    private dialogRef: MatDialogRef<InvitationDialogComponent>,
    private router: Router
  ) {
    this.invitation = data.invitation;
  }

  onAcceptRequest() {
    this.detailsService.acceptOrDeclineInvitation(this.invitation.id, true)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: err => {  }
      });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
