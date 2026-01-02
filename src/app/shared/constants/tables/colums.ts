import {
  getRoleLabel,
  getUserStatusClass,
  getUserStatusLabel,
} from '@shared/utils/helpers';
import { ColumnField, DriverColumnField } from '../app.enums';
import { Messages } from '../messages';
import { AdminListItem, DriverListItem } from '@shared/types/Pages/admin.types';
import { GenericTableColumn } from '@shared/components/generic-table/generic-table.component';

export const COLUMNS: {
  ADMIN_LIST: GenericTableColumn<AdminListItem>[];
  DRIVER_LIST: GenericTableColumn<DriverListItem>[];
} = {
  ADMIN_LIST: [
    {
      field: ColumnField.ADMIN_ID,
      header: Messages.ADMIN.TABLE_HEADERS.ADMIN_ID,
    },
    {
      field: ColumnField.USERNAME,
      header: Messages.ADMIN.TABLE_HEADERS.USERNAME,
    },
    {
      field: ColumnField.EMAIL,
      header: Messages.ADMIN.TABLE_HEADERS.EMAIL,
    },
    {
      field: ColumnField.PHONE_NUMBER,
      header: Messages.ADMIN.TABLE_HEADERS.PHONE_NUMBER,
    },
    {
      field: ColumnField.ADMIN_ROLE,
      header: Messages.ADMIN.TABLE_HEADERS.ROLE,
      cell: (item: AdminListItem) => getRoleLabel(item.admin_role),
    },
    {
      field: ColumnField.IS_ACTIVE,
      header: Messages.ADMIN.TABLE_HEADERS.STATUS,
      cell: (item: AdminListItem) => ({
        label: getUserStatusLabel(item.is_active),
        class:
          'generic-table-badge generic-table__status-badge--' +
          getUserStatusClass(item.is_active),
      }),
    },
  ],
  DRIVER_LIST: [
    {
      field: DriverColumnField.USER_ID,
      header: Messages.DRIVER.TABLE_HEADERS.DRIVER_ID,
    },
    {
      field: DriverColumnField.PHONE_NUMBER,
      header: Messages.DRIVER.TABLE_HEADERS.PHONE_NUMBER,
    },
    {
      field: DriverColumnField.IS_ACTIVE,
      header: Messages.DRIVER.TABLE_HEADERS.STATUS,
      cell: (item) => ({
        label: getUserStatusLabel(item.is_active),
        class:
          'generic-table-badge generic-table__status-badge--' +
          getUserStatusClass(item.is_active),
      }),
    },
  ],
};
