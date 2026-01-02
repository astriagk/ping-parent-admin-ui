import { BREADCRUMB_LABELS } from '@shared/constants/route.constants';
import { IMenuType, IMobileMenu } from '../types/menu-d-t';
import { ROUTE_PATHS } from '@shared/constants/routesPaths';

const menuData: IMenuType[] = [
  {
    link: '/',
    title: 'Home',
    hasDropdown: false,
  },
  {
    link: '/admin/admins',
    title: 'Admin',
    hasDropdown: true,
    megamenu: false,
    dropdownItems: [
      { link: ROUTE_PATHS.ADMIN_LIST, title: BREADCRUMB_LABELS.admin.admins },
      { link: ROUTE_PATHS.DRIVER_LIST, title: BREADCRUMB_LABELS.admin.drivers },
    ],
  },
  {
    link: '/pages/contact',
    title: 'Contact',
  },
];

export default menuData;

// mobile menus
export const mobile_menus: IMobileMenu[] = [
  {
    title: 'Home',
  },
  {
    title: BREADCRUMB_LABELS.admin.root,
    dropdownMenu: [
      { link: ROUTE_PATHS.ADMIN_LIST, title: BREADCRUMB_LABELS.admin.admins },
      { link: ROUTE_PATHS.DRIVER_LIST, title: BREADCRUMB_LABELS.admin.drivers },
    ],
  },
  {
    title: 'Contact',
    link: '/pages/contact',
  },
];
