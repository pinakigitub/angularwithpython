import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './common/http-service.service';
import { GlobalConstantsServiceService } from './common/global-constants-service.service';

declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  iteemToupdate:any={};
  studentlist: any = [];
  constructor(private _sref: GlobalConstantsServiceService,
    private _httpClient: HttpServiceService) {
  }
  ngOnInit() {
    this.getUserInfo();
  }
  public getUserInfo() {

    this._httpClient.get(this._sref.API_ENDPOINT() + 'getStudentDetails')
      .toPromise()
      .then(y => {
        this.studentlist = y.json()

      });

  }
  public edit(item) {
    this.iteemToupdate = Object.assign( this.iteemToupdate, item);
  }
  public add(){
    this.iteemToupdate={};
  }
  public savetoDb(){
    if(this.iteemToupdate._id!=undefined)
    {
      let id_temp=this.iteemToupdate._id.$oid;
      delete this.iteemToupdate._id;
      this.iteemToupdate._id=id_temp;
    }
    this._httpClient.post(this._sref.API_ENDPOINT() + 'updateStudetDetail',this.iteemToupdate)
      .toPromise()
      .then(y => {
        this.getUserInfo();
        jQuery("#EditModal").modal("hide");
      });
  }
  public delete(id)
  {
    this._httpClient.get(this._sref.API_ENDPOINT() + 'deleteStudetDetail?_id='+id)
    .toPromise()
    .then(y => {
      this.getUserInfo();
    });
  }
}
