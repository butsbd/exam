import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inner-table',
  templateUrl: './inner-table.component.html',
  styleUrls: ['./inner-table.component.scss']
})
export class InnerTableComponent implements OnInit {

 @Input() data: any[]=[];

  displayedColumns: string[] = ["value", "correct"];
  dataSource: any[]=[]
  ngOnInit() {
this.dataSource = this.data;

}
}

