import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {CreateGroupRequest} from '@app/groups/model/requests/create-group.request';
import {LeaderGroupService} from '@app/groups/services/leader-group.service';
import {Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

function imageUrlValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  const pattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i;
  return pattern.test(value) ? null : { invalidImageUrl: true };
}

@Component({
  selector: 'app-create-group',
  imports: [MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule, TranslatePipe],
  template: `
    <div class="w-full h-full">
      <h2 class="text-2xl font-bold">{{ 'createGroup.title' | translate }}</h2>
      <form [formGroup]="createGroupForm" (ngSubmit)="onSubmit()" class="container h-full p-10 flex flex-col ">
        <div class="flex flex-col">
          <mat-form-field appearance="fill" class="custom-form-field full-width">
            <mat-label>{{ 'createGroup.fields.name.label' | translate }}</mat-label>
            <mat-icon matPrefix style="color: #888;">person</mat-icon>
            <input matInput formControlName="name" placeholder="'createGroup.fields.name.placeholder' | translate" type="text" required>
            @if (createGroupForm.get('name')?.hasError){
              <mat-error >
                {{ 'createGroup.fields.name.required' | translate }}
              </mat-error>
            }
          </mat-form-field>
          <mat-form-field appearance="fill" class="custom-form-field full-width">
            <mat-label>{{ 'createGroup.fields.description.label' | translate }}</mat-label>
            <mat-icon matPrefix style="color: #888;">group</mat-icon>
            <textarea matInput formControlName="description" placeholder="{{'createGroup.fields.description.placeholder' | translate}}" type="text" required rows="8" ></textarea>
            @if (createGroupForm.get('description')?.hasError){
              <mat-error >
                {{ 'createGroup.fields.description.required' | translate }}
              </mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="fill" class="custom-form-field full-width">
            <mat-label>{{ 'createGroup.fields.imgUrl.label' | translate }}</mat-label>
            <mat-icon matPrefix style="color: #888;">link</mat-icon>
            <input matInput formControlName="imgUrl" placeholder="{{'createGroup.fields.imgUrl.placeholder' | translate}}" type="text" required>
            @if (createGroupForm.get('imgUrl')?.hasError('required')){
              <mat-error >
                {{ 'createGroup.fields.imgUrl.required' | translate }}
              </mat-error>
            }
            @if (createGroupForm.get('imgUrl')?.hasError('invalidImageUrl')){
              <mat-error>
                {{ 'createGroup.fields.imgUrl.invalid' | translate }}
              </mat-error>
            }
          </mat-form-field>
        </div>
        <div class="h-full flex justify-center items-center">
          <button
            [disabled]="createGroupForm.invalid"
            class="bg-[#4A90E2] rounded-2xl text-white text-xl py-2 px-6 shadow-md shadow-gray-400 hover:cursor-pointer hover:bg-[#559df2] transition disabled:bg-gray-400 disabled:cursor-default">
            {{ 'createGroup.actions.save' | translate }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: ``
})
export class CreateGroupComponent {
  createGroupForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private leaderGroupService : LeaderGroupService, private router: Router) {
    this.createGroupForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imgUrl: ['', [Validators.required, imageUrlValidator]]
    });
  }

  onSubmit(): void {
    if (this.createGroupForm.invalid) return;

    const name = this.createGroupForm.value.name ?? '';
    const description = this.createGroupForm.value.description ?? '';
    const imgUrl = this.createGroupForm.value.imgUrl ?? '';


    this.leaderGroupService.createGroup(new CreateGroupRequest(name, imgUrl, description)).subscribe({
      next: () => {
        this.router.navigate(['leaders/group']).then();
      },
      error: (err) => {
        console.error('Error creating group', err);
      }
    })
    this.submitted = true;
  }
}
