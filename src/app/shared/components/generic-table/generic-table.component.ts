import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';

export interface GenericTableColumn<T = any> {
  field: string;
  header: string;
  cell?: (item: T, index: number) => any;
  cellTemplate?: TemplateRef<any>;
  sortable?: boolean;
}

export interface GenericTableAction {
  label: string;
  action: string;
  class?: string;
  icon?: string;
  ariaLabel?: string;
}

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  standalone: false,
})
export class GenericTableComponent<T = any> {
  @Input() items: T[] = [];
  @Input() columns: GenericTableColumn<T>[] = [];
  @Input() actions: GenericTableAction[] = [];
  @Input() emptyMessage: string = 'No data found.';
  @Input() tableCaption?: string;
  @Input() enableRowClick: boolean = true;
  @Input() data: any[] = [];
  @Input() paginate: any;

  @Output() rowClicked = new EventEmitter<T>();
  @Output() actionClicked = new EventEmitter<{ action: string; item: T }>();
  @Output() setPage = new EventEmitter<any>();

  rowClick(item: T) {
    if (this.enableRowClick) {
      this.rowClicked.emit(item);
    }
  }

  onAction(action: GenericTableAction, item: T, event: Event) {
    event.stopPropagation();
    this.actionClicked.emit({ action: action.action, item });
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByField(_index: number, column: GenericTableColumn<T>): string {
    return column.field;
  }

  getCellValue(column: GenericTableColumn<T>, item: T, index: number): any {
    if (column.cell) {
      return column.cell(item, index);
    }
    return this.getNestedProperty(item, column.field);
  }

  private getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }

  isStatusField(value: any): boolean {
    return (
      value && typeof value === 'object' && 'label' in value && 'class' in value
    );
  }
}
