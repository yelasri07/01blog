import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../core/interfaces/user.interface';
import { ProfileService } from '../services/profile.service';
import { BlogsComponent } from '../../../shared/components/blogs.component/blogs.component';
import { AuthStateService } from '../../../core/services/auth.state.service';
import { MediaService } from '../../../core/services/media.service';

@Component({
  selector: 'app-page',
  imports: [BlogsComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private profileService = inject(ProfileService)
  private authStateService = inject(AuthStateService);
  private mediaService = inject(MediaService)
  currentUser = signal(this.authStateService.getCurrentUser());

  showNotFoundError = signal(false);
  userProfile = signal<User | null>(null);

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

  async uploadImage(event: Event) {
    const ipt = event.target as HTMLInputElement;
    if (!ipt.files) return;
    const file = ipt.files[0];
    const result = await this.mediaService.uploadFile(file, "profileImages")
    this.profileService.submitProfileImage(result.url, result.public_id).subscribe({
      next: response => {
        this.userProfile.set(response)
      }
    })
  }

  private fetchProfile(userId: number) {
    this.profileService.getUserProfile(userId).subscribe({
      next: response => {
        this.userProfile.set(response)
      },
      error: _ => {
        this.showNotFoundError.set(true)
      }
    })
  }

}
