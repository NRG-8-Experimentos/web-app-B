import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-no-member-display',
  imports: [
    TranslatePipe
  ],
  template: `
    <div class="flex-1 w-full h-full rounded-3xl bg-[#1A4E85] p-8 text-white text-center text-xl ">
      {{ 'myGroupMember.noMembers' | translate }}
    </div>
  `,
  styles: ``
})
export class NoMemberDisplayComponent {

}
