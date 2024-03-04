import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../../../../shared/components/post/post/post.component';
import { PostDataService } from '../../../../core/services/post-data.service';

@Component({
  selector: 'AddArticlePage',
  standalone: true,
  imports: [FormsModule, PostComponent],
  templateUrl: './add-article-page.component.html',
  styleUrl: './add-article-page.component.scss',
})
export class AddArticlePageComponent {
  public pds = inject(PostDataService);

  publish() {
    this.pds.logging()
  }
}
