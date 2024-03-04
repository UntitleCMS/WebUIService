import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CoverImageComponent } from '../cover-image/cover-image.component';
import { PostDataService } from '../../../../core/services/post-data.service';

@Component({
  selector: 'PostCover',
  standalone: true,
  imports: [CommonModule, CoverImageComponent],
  templateUrl: './post-cover.component.html',
  styleUrl: './post-cover.component.scss',
})
export class PostCoverComponent {
  @Input() coverImageSrc?: string = undefined;
  coverImage?: File;

  @Input() isEditable = false;

  constructor(private pds: PostDataService) {}

  ngOnInit() {
    this.pds.coverSrc.set(this.coverImageSrc);
  }

  onCoverImageChange(e: Event) {
    let el = e.target as HTMLInputElement;
    this.coverImage = el.files![0];
    this.coverImageSrc = URL.createObjectURL(this.coverImage!);
    this.setCoverImage();
  }

  clearCoverImage() {
    this.coverImageSrc = undefined;
    this.coverImage = undefined;
    this.setCoverImage();
  }

  setCoverImage() {
    this.pds.coverSrc.set(this.coverImageSrc);
    this.pds.coverFile.set(this.coverImage);
  }
}
