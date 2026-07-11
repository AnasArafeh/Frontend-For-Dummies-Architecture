import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-area',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.area.html',
  styleUrls: ['./search.area.scss'],
})
export class SearchArea {
  @Output() onSearch = new EventEmitter<string>();
  query = '';
  category = 'All';

  handleSubmit(e: Event): void {
    e.preventDefault();
    if (this.query.trim()) {
      this.onSearch.emit(this.query.trim());
    }
  }
}
