interface MenuItem {
  to: string[];
  icon: string;
  label: string;
  exact: boolean;
  requireLoggedIn: boolean;
}

export const menu: MenuItem[] = [
  {
    to: ['/'],
    icon: 'home',
    label: 'หน้าหลัก',
    exact: true,
    requireLoggedIn: false,
  },
  {
    to: ['/', 'following'],
    icon: 'newspaper',
    label: 'กำลังติดตาม',
    exact: false,
    requireLoggedIn: true,
  },
  {
    to: ['/', 'search'],
    icon: 'search',
    label: 'ค้นหา',
    exact: false,
    requireLoggedIn: false,
  },
  {
    to: ['/', 'write'],
    icon: 'edit',
    label: 'เขียนบทความ',
    exact: false,
    requireLoggedIn: true,
  },
  {
    to: ['/', 'my-posts'],
    icon: 'article',
    label: 'บทความของฉัน',
    exact: false,
    requireLoggedIn: true,
  },
  {
    to: ['/', 'bookmark'],
    icon: 'bookmark',
    label: 'บุ๊กมาร์กของฉัน',
    exact: false,
    requireLoggedIn: true,
  },
  {
    to: ['/', 'me'],
    icon: 'person',
    label: 'โปรไฟล์ของฉัน',
    exact: false,
    requireLoggedIn: true,
  },
];
