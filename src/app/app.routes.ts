import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainPageComponent } from './features/read/pages/main-page/main-page.component';
import { MainFeedComponent } from './features/read/feed/main-feed/main-feed.component';
import { FollowingFeedComponent } from './features/read/feed/following-feed/following-feed.component';
import { PlainLayoutComponent } from './layouts/plain-layout/plain-layout.component';
import { ArticlePageComponent } from './features/read/pages/article-page/article-page.component';
import { MyPostPageComponent } from './features/read/pages/my-post-page/my-post-page.component';

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
          },
        ],
      },
      {
        path: 'my-posts',
        component: MyPostPageComponent,
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
    ],
  },
  {
    path: '',
    component: PlainLayoutComponent,
    children: [
      {
        path: 'post/:postId',
        component: ArticlePageComponent,
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'write',
        loadChildren: () =>
          import('./features/write/write.module').then((m) => m.WriteModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];
