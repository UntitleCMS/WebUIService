import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainPageComponent } from './features/read/pages/main-page/main-page.component';
import { MainFeedComponent } from './features/read/feed/main-feed/main-feed.component';
import { FollowingFeedComponent } from './features/read/feed/following-feed/following-feed.component';
import { ArticlePageComponent } from './features/read/pages/article-page/article-page.component';
import { MyPostPageComponent } from './features/read/pages/my-post-page/my-post-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
        children: [
          {
            path: '',
            component: MainFeedComponent,
          },
          {
            path: 'following',
            component: FollowingFeedComponent,
            canActivate: [authGuard],
          },
        ],
      },
      {
        path: 'my-posts',
        component: MyPostPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./features/search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'tags/:tagId',
        loadComponent: () =>
          import(
            './features/search/pages/tag-search/tag-search.component'
          ).then((m) => m.TagSearchComponent),
      },
      {
        path: 'bookmark',
        loadComponent: () =>
          import(
            './features/profile/pages/bookmark-page/bookmark-page.component'
          ).then((m) => m.BookmarkPageComponent),
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'post/:postId',
        component: ArticlePageComponent,
      },
      {
        path: 'write',
        loadChildren: () =>
          import('./features/write/write.module').then((m) => m.WriteModule),
        canActivate: [authGuard],
      },
    ],
  },
];
