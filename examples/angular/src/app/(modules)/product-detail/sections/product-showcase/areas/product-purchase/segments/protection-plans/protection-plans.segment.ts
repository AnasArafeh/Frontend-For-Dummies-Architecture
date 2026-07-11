import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductShowcaseStateManagement } from '../../../../../../state-management/product-showcase/product-showcase.state-management';

@Component({
  selector: 'app-protection-plans-segment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './protection-plans.segment.html',
  styleUrls: ['./protection-plans.segment.scss'],
})
export class ProtectionPlansSegment {
  state = inject(ProductShowcaseStateManagement);

  togglePlan(index: number): void {
    const plans = this.state.protectionPlans().map((p, i) =>
      i === index ? { ...p, selected: !p.selected } : p
    );
    this.state.protectionPlans.set(plans);
  }
}
