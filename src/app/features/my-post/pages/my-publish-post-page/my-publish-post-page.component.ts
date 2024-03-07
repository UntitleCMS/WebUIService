import { Component, inject } from '@angular/core';
import { PostOverviewSectionComponent } from '../../../../shared/components/post/post-overview-section/post-overview-section.component';
import { UserService } from '../../../../core/auth/user.service';

@Component({
  selector: 'app-my-publish-post-page',
  standalone: true,
  imports: [PostOverviewSectionComponent],
  templateUrl: './my-publish-post-page.component.html',
  styleUrl: './my-publish-post-page.component.scss'
})
export class MyPublishPostPageComponent {
  user = inject(UserService)
}
