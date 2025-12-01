import { Component } from '@angular/core';
import {NoGroupDisplayComponent} from '../no-group-display/no-group-display.component';
import {
  ProfileImageDisplayComponent
} from '@app/shared/components/profile-image-display/profile-image-display.component';
import {MatIconModule} from '@angular/material/icon';
import {LeaderGroupService} from '@app/groups/services/leader-group.service';
import {Group} from '@app/groups/model/group.entity';
import {GroupService} from '@app/groups/services/group.service';
import {ShortMember} from '@app/shared/model/short-member.entity';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';
import {TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'app-group-display',
  imports: [
    NoGroupDisplayComponent,
    ProfileImageDisplayComponent,
    MatIconModule,
    TranslatePipe
  ],
  template: `
    <div class="w-full h-full">
      @if (loading) {
        <div class="w-full h-full flex justify-center items-center">
          <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="cached" class="animate-spin"></mat-icon>
        </div>
      } @else {
        @if (hasGroup){
          <div class="w-full h-full grid grid-cols-2 gap-16 min-h-0">
            <div class="w-full h-full flex flex-col gap-7">
              <h2 class="text-2xl font-bold">{{ 'groupDisplay.groupTitle' | translate }}</h2>

              <app-profile-image-display [groupName]="group.name" alt="Imagen del grupo" [imgSrc]="group.imgUrl"/>

              <div class="text-white flex justify-center items-center">
                <div class="bg-[#4A90E2] rounded-2xl py-2 px-6 text-xl">
                  #{{ group.code}}
                </div>
              </div>
              <div class="w-full flex-1">
                <div class="w-full h-full rounded-3xl bg-[#1A4E85] p-8 text-white text-center text-xl flex items-center ">
                  @if (group.description.length > 200) {
                    {{ group.description.slice(0, 200) + '...'}}
                  } @else {
                    {{ group.description }}
                  }
                </div>
              </div>
            </div>
            <div class="h-full flex flex-col gap-7 min-h-0">
              <h2 class="text-2xl font-bold">{{ 'groupDisplay.membersTitle' | translate }}</h2>
              @if (hasMembers) {
                <div class="flex-1 rounded-3xl p-8 text-center text-xl min-h-0 themed-panel">
                  <div class="rounded-2xl h-full themed-inner">
                    <div class="flex flex-col p-4 gap-4 h-full overflow-y-auto">

                      @for (member of members; track member.id) {
                        <div class="flex justify-between items-center">
                          <div class="inline mb-4 md:mb-0 md:flex items-center ">
                            <img [src]="member.imgUrl" [alt]="member.name"
                                 class="aspect-square rounded-full w-13 object-cover shadow-md shadow-gray-800 mr-4" />
                            <h3 class="text-md font-medium"> {{ member.name }} </h3>
                          </div>
                          <button
                            (click)="openDialog(member.name, member.id)"
                            class="bg-gray-300 flex items-center px-1 py-2 rounded hover:bg-red-400" >
                            <mat-icon aria-hidden="false" aria-label="delete" fontIcon="delete" />
                          </button>
                        </div>
                      }

                    </div>
                  </div>
                </div>
              } @else {
                <div class="flex-1 w-full h-full rounded-3xl bg-[#1A4E85] p-8 text-white text-center text-xl ">
                  {{ 'groupDisplay.noMembers' | translate }}
                </div>
              }
            </div>
          </div>
        } @else {
          <h2 class="text-2xl font-bold">{{ 'groupDisplay.groupTitle' | translate }}</h2>
          <app-no-group-display/>
        }
      }
    </div>
  `,
  styles: `
    :host .bg-\\[\\#F4F4F4\\] {
      background: var(--surface) !important;
      color: var(--text) !important;
      border: 1px solid var(--border) !important;
      box-shadow: var(--elev-1, 0 2px 8px rgba(0, 0, 0, .06)) !important;
    }

    :host .bg-white {
      background: var(--surface-2) !important;
      color: var(--text) !important;
      border: 1px solid var(--border) !important;
    }

    :host .text-black {
      color: var(--text) !important;
    }

    :host .bg-gray-300 {
      background: color-mix(in oklab, var(--surface-2) 70%, #ffffff 30%) !important;
      color: var(--text) !important;
      border: 1px solid var(--border) !important;
      transition: background .12s ease, color .12s ease, border-color .12s ease;
    }

    :host .bg-gray-300:hover {
      background: #ef4444 !important;
      color: #ffffff !important;
      border-color: #ef4444 !important;
    }

    :host h3 {
      color: var(--text) !important;
    }

    :host .overflow-y-auto {
      scrollbar-width: thin;
      scrollbar-color: var(--border) transparent;
    }

    :host .overflow-y-auto::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    :host .overflow-y-auto::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 999px;
    }

    :host .overflow-y-auto::-webkit-scrollbar-track {
      background: transparent;
    }
    :host .themed-panel{
      background: var(--surface) !important;
      color: var(--text) !important;
      border: 1px solid var(--border) !important;
      border-radius: 1.5rem;              /* mantiene tu rounded-3xl */
      box-shadow: var(--elev-1, 0 2px 8px rgba(0,0,0,.06)) !important;
    }

    :host .themed-inner{
      background: var(--surface-2) !important;
      color: var(--text) !important;
      border: 1px solid var(--border) !important;
      border-radius: 1rem;
    }

    :host .bg-gray-300{
      background: color-mix(in oklab, var(--surface-2) 70%, #ffffff 30%) !important;
      color: var(--text) !important;
      border: 1px solid var(--border) !important;
      transition: background .12s ease, color .12s ease, border-color .12s ease;
    }
    :host .bg-gray-300:hover{
      background: #ef4444 !important;
      color: #fff !important;
      border-color: #ef4444 !important;
    }


  `
})
export class GroupDisplayComponent {

  hasGroup = false;
  hasMembers = false;

  loading = true;

  members !: ShortMember[];

  group !: Group;



  constructor(private leaderGroupService: LeaderGroupService, private groupService:GroupService, private dialog : MatDialog) {

  }

  ngOnInit() {
    this.getLeaderGroup();
    this.getMembersOfGroup();
  }

  getLeaderGroup(){
    this.leaderGroupService.getLeaderGroup().subscribe({
      next: (group) => {
        this.group = group;
        this.hasGroup = true;
      },
      error: (err) => {
        this.hasGroup = false;
      }
    })
  }

  getMembersOfGroup(){
    this.groupService.getAllMembersOfGroup().subscribe({
      next: (members) => {
        this.members = members;
        this.hasMembers = members.length > 0;
        this.loading = false;
      },
      error: (err) => {
        this.hasMembers = false;
        this.loading = false;
      }
    })
  }

  deleteMember(memberId: number){
    this.leaderGroupService.deleteMemberFromGroup(memberId).subscribe({
      next: () => {
        this.members = this.members.filter(m => m.id !== memberId);
        this.hasMembers = this.members.length > 0;
      },
      error: (err) => {
        console.error('Error deleting member', err);
      }
    })
  }

  openDialog(memberName : string,memberId:number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Member',
        description: `Are you sure you want to delete ${memberName} from the group?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "true") {
        this.deleteMember(memberId);
      }
    });
  }


  protected readonly Array = Array;
}
