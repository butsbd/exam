export class BaseRequestModel {
    
    constructor() {
     this.keyword="";
     this.page=0;
     this.rowsPerPage=5;
     this.orderBy="updatedOn";
     this.isAscending=false;
    }
  keyword: string;
  page: number;
  rowsPerPage: number;
  orderBy: string;
  isAscending:boolean
}