import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../core/interfaces/user.interface';
import { ProfileService } from '../services/profile.service';
import { BlogsComponent } from '../../../shared/components/blogs.component/blogs.component';
import { AuthStateService } from '../../../core/services/auth.state.service';
import { MediaService } from '../../../core/services/media.service';
import { finalize } from 'rxjs';
import { ReportModalComponent } from "../../../shared/components/report-modal.component/report-modal.component";
import { needConfirmation } from '../../../shared/decorators/confirm-dialog.decorator';
import { SuccessPopupComponent } from "../../../shared/components/success-popup.component/success-popup.component";

@Component({
  selector: 'app-page',
  imports: [BlogsComponent, ReportModalComponent, SuccessPopupComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private profileService = inject(ProfileService)
  private authStateService = inject(AuthStateService);
  private mediaService = inject(MediaService)
  currentUser = signal(this.authStateService.getCurrentUser());
  showOptions = signal(false);
  isReportModalVisible = signal(false);

  showNotFoundError = signal(false);
  userProfile = signal<User | null>(null);
  loader = signal(true);
  successPopup = signal<string>("")

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const userId = Number(params.get('id'))
      if (isNaN(userId)) {
        this.showNotFoundError.set(true);
        return
      }
      this.showNotFoundError.set(false);
      this.fetchProfile(userId)
    });
  }

  addFollow() {
    this.profileService.submitFollow(this.userProfile()?.id!).subscribe({
      next: response => {
        this.userProfile.set(response)
      }
    })
  }

  changeOptionsVisibility(event: MouseEvent) {
    event.stopPropagation();
    this.showOptions.update(prev => !prev);
  }

  async uploadImage(event: Event) {
    const ipt = event.target as HTMLInputElement;
    if (!ipt.files) return;
    const file = ipt.files[0];
    this.loader.set(true);
    try {
      const result = await this.mediaService.uploadFile(file, "profileImages")
      this.profileService.submitProfileImage(result.url, result.public_id).subscribe({
        next: response => {
          this.userProfile.set(response)
        }
      })
    } finally {
      this.loader.set(false)
    }
  }

  closeSuccessPopup() {
    this.successPopup.set("");
  }

  hideReportModal(successPopup: string) {
    this.successPopup.set(successPopup)
    this.isReportModalVisible.set(false)
  }

  showReportModal() {
    this.isReportModalVisible.set(true)
  }

  private fetchProfile(userId: number) {
    this.profileService.getUserProfile(userId).pipe(
      finalize(() => {
        this.loader.set(false)
      })
    ).subscribe({
      next: response => {
        this.userProfile.set(response)
      },
      error: _ => {
        this.showNotFoundError.set(true)
      },
    })
  }

  @HostListener("document:click")
  hideOptions() {
    this.showOptions.set(false)
  }

}
