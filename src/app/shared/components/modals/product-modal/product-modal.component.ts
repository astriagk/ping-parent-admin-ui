import { Component } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  standalone: false,
})
export class ProductModalComponent {
  constructor(public utilsService: UtilsService) {}
}
