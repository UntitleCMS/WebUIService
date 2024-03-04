import { Routes } from '@angular/router';
import { MainFeedPageComponent } from './features/feed/pages/main-feed-page/main-feed-page.component';
import { FeedLayoutComponent } from './features/feed/layouts/feed-layout/feed-layout.component';
import { FollowingFeedPageComponent } from './features/feed/pages/following-feed-page/following-feed-page.component';
import { MainSearchPageComponent } from './features/search/pages/main-search-page/main-search-page.component';
import { AddArticlePageComponent } from './features/write/pages/add-article-page/add-article-page.component';

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
      },
    ],
  },
  {
    path: 'search',
    component: MainSearchPageComponent
  },
  {
    path: 'write',
    component: AddArticlePageComponent
  }
];
