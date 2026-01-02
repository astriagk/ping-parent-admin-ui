import {
  ActionLabel,
  ActionType,
  DriverActionLabel,
  DriverActionType,
} from '../app.enums';
import { GenericTableAction } from '@shared/components/generic-table/generic-table.component';

export const ACTIONS: {
  ADMIN_ACTIONS: GenericTableAction[];
  DRIVER_ACTIONS: GenericTableAction[];
} = {
  ADMIN_ACTIONS: [
    {
      label: ActionLabel.VIEW,
      action: ActionType.VIEW,
      class: 'btn-view',
    },
  ],
  DRIVER_ACTIONS: [
    {
      label: DriverActionLabel.VIEW,
      action: DriverActionType.VIEW,
      class: 'btn-view',
    },
  ],
};
