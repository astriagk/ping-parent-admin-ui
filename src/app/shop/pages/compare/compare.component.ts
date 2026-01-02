import { Component } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { CompareService } from '@shared/services/compare.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
  standalone: false,
})
export class CompareComponent {
  constructor(
    public compareService: CompareService,
    public cartService: CartService
  ) {}
}
