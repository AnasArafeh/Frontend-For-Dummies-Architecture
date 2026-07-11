import { Component, Input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-base-table',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './base-table.html',
  styleUrls: ['./base-table.scss'],
})
export class BaseTable {
  @Input() columns: { key: string; header: string; render: (row: any) => string }[] = [];
  @Input() rows: any[] = [];
  @Input() rowKey: (row: any) => string = (row: any) => '';
  @Input() rowActions: any = null;
}
