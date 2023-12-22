import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment, CommentRequest } from '../models/comment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentRepositoryService {
  private readonly commentEndpoint = '/api/comment/v1/comments';

  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: string) {
    return this.http.get<Comment[]>(`${this.commentEndpoint}/${postId}`);
  }

  getCommentByPostId(postId: string, commentId: string) {
    return this.http.get<Comment>(
      `${this.commentEndpoint}/${postId}/${commentId}`
    );
  }

  addCommentToPostId(postId: string, req: CommentRequest) {
    return this.http
      .post<Comment[]>(`${this.commentEndpoint}/${postId}`, req)
      .pipe(map((res) => res[0]));
  }

  editCommentInPostId(postId: string, req: CommentRequest) {
    return this.http.put<Comment>(`${this.commentEndpoint}/${postId}`, req);
  }

  deleteCommentInPostId(postId: string, commentId: string) {
    return this.http.delete<Comment>(
      `${this.commentEndpoint}/${postId}/${commentId}`
    );
  }
}
