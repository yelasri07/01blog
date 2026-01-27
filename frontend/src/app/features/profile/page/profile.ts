import { Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../core/interfaces/user.interface';
import { ProfileService } from '../services/profile.service';
import { BlogsComponent } from '../../../shared/components/blogs.component/blogs.component';

@Component({
  selector: 'app-page',
  imports: [BlogsComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private profileService = inject(ProfileService)
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
  
  }

  private fetchProfile(userId: number) {
    this.profileService.getUserProfile(userId).subscribe({
      next: response => {
        this.userProfile.set(response)
        console.log(this.userProfile());
      },
      error: err => {
        this.showNotFoundError.set(true)
      }
    })
  }

}
