import { Component, Input } from '@angular/core';
import { CoverComponent } from '../cover/cover.component';
import { CommonModule } from '@angular/common';
import { PostDataService } from '../../../../core/services/post-data.service';

@Component({
  selector: 'app-post-cover',
  standalone: true,
  imports: [CommonModule, CoverComponent],
  templateUrl: './post-cover.component.html',
  styleUrl: './post-cover.component.scss',
})
export class PostCoverComponent {
  @Input() coverImageSrc? = '';
  coverImage?: File;

  @Input() isEditable = false;

  constructor(private pds: PostDataService) {}

  ngOnInit() {
    this.pds.coverImageSrc = this.coverImageSrc;
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
    this.pds.coverImageSrc = this.coverImageSrc;
    this.pds.coverImage = this.coverImage;
  }
}
