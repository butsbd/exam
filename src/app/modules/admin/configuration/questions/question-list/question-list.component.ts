import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, OnInit, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { InnerTableComponent } from "./inner-table/inner-table.component";
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent  implements OnInit {
  displayedColumns: string[] = ["label", "examId"];
  dataSource:any={}
  expandedRow: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren("tableRow", { read: ViewContainerRef }) rowContainers;

  constructor(private resolver: ComponentFactoryResolver,private http:HttpClient) {}
  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(keyword="",page=0,rowsPerPage=5): void {
     this.http.post<any>(environment.apiUrl + 'Question/search', { page:page,rowsPerPage:rowsPerPage }).subscribe(res=>{
      this.dataSource=res?.data
    });;
  }
 pageChanged(event: any): void {
    this.getQuestions("",event.pageIndex,event.pageSize);
  }


  insertComponent(index: number) {
    console.log("this.rowContainers", this.rowContainers);
    if (this.expandedRow != null) {
      // clear old content
      this.rowContainers.toArray()[this.expandedRow].clear();
    }

    if (this.expandedRow === index) {
      this.expandedRow = null;
    } else {
      const container = this.rowContainers.toArray()[index];
      console.log("container", container);
      const factory: ComponentFactory<
        any
      > = this.resolver.resolveComponentFactory(InnerTableComponent);
      const inlineComponent = container.createComponent(factory);
      console.log("container", container);

      console.log("factory", factory);

      inlineComponent.instance.data = this.dataSource.item1[index].choices;
      console.log("inlineComponent", inlineComponent);
      this.expandedRow = index;
    }
  }
}



