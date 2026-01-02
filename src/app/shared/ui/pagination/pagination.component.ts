import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
} from '@angular/core';

export interface PaginateConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages?: number;
  pages?: number[];
  startPage?: number;
  endPage?: number;
  startIndex?: number;
  endIndex?: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: false,
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() paginate: PaginateConfig = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
    pages: [],
  };
  @Output() setPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    console.log(this.paginate);
    this.updatePagination();
  }

  ngOnChanges(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    if (this.paginate && this.paginate.totalItems) {
      const pager = this.getPager(
        this.paginate.totalItems,
        this.paginate.currentPage,
        this.paginate.itemsPerPage
      );
      Object.assign(this.paginate, pager);
    }
  }

  public getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 9
  ) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }

  pageSet(page: number) {
    if (page >= 1 && page <= (this.paginate.totalPages || 1)) {
      this.setPage.emit(page); // Set Page Number
    }
  }
}
