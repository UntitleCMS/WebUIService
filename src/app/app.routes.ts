import { Routes } from '@angular/router';
import { MainFeedPageComponent } from './features/feed/pages/main-feed-page/main-feed-page.component';
import { FeedLayoutComponent } from './features/feed/layouts/feed-layout/feed-layout.component';
import { FollowingFeedPageComponent } from './features/feed/pages/following-feed-page/following-feed-page.component';
import { MainSearchPageComponent } from './features/search/pages/main-search-page/main-search-page.component';
import { AddArticlePageComponent } from './features/write/pages/add-article-page/add-article-page.component';
import { ArticlePageComponent } from './features/read/pages/article-page/article-page.component';
import { ProfilePageComponent } from './features/profile/pages/profile-page/profile-page.component';
import { MyProfilePageComponent } from './features/profile/pages/my-profile-page/my-profile-page.component';
import { ProfileSettingsPageComponent } from './features/profile/pages/profile-settings-page/profile-settings-page.component';
import { EditArticlePageComponent } from './features/write/pages/edit-article-page/edit-article-page.component';
import { authGuard } from './core/guards/auth.guard';
import { TagSearchComponent } from './features/search/pages/tag-search/tag-search.component';

export const routes: Routes = [
  {
    path: '',
    component: FeedLayoutComponent,
    children: [
      {
        path: '',
        component: MainFeedPageComponent,
      },
      {
        path: 'following',
        component: FollowingFeedPageComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'search',
    component: MainSearchPageComponent,
  },
  {
    path: 'tags/:tagName',
    component: TagSearchComponent,
  },
  {
    path: 'write',
    component: AddArticlePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit/:postId',
    component: EditArticlePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'articles/:postId',
    component: ArticlePageComponent,
  },
  {
    path: 'profiles/:userId',
    component: ProfilePageComponent,
  },
  {
    path: 'me',
    component: MyProfilePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'me/settings',
    component: ProfileSettingsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-posts',
    loadChildren: () =>
      import('./features/my-post/my-post-routing.module').then(
        (m) => m.MyPostRoutingModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'bookmark',
    loadComponent: () =>
      import(
        './features/bookmark/pages/my-bookmark-page/my-bookmark-page.component'
      ).then((m) => m.MyBookmarkPageComponent),
    canActivate: [authGuard],
  },
];
