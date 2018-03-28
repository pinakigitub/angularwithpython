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
  isLoading: boolean = false;
  iteemToupdate:any={};
  studentlist: any = [];
  userDetails:any={};
 
  public popoverTitle: string = 'Are you sure want to delete ?';
  public popoverMessage: string = 'item will be permanently deleted.';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

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
    this.isLoading = !this.isLoading;
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
        this.isLoading = !this.isLoading;
        jQuery("#EditModal").modal("hide");
      },x=>{
        jQuery("#EditModal").modal("hide");
        this.isLoading = !this.isLoading;
        jQuery("#loginModal").modal("show");
      });
  }
  public confirm(id)
  {
   this.delete(id);
  }
  public delete(id)
  {
  
    this._httpClient.get(this._sref.API_ENDPOINT() + 'deleteStudetDetail?_id='+id)
    .toPromise()
    .then(y => {
      this.getUserInfo();
    
    },x=>{
      jQuery("#loginModal").modal("show");
    });
  }
  public login()
  {

  }
  public validate()
  {
    this.isLoading = !this.isLoading;
    this._httpClient.post(this._sref.API_ENDPOINT() + 'validateUser',this.userDetails)
      .toPromise()
      .then(y => {
        this.isLoading = !this.isLoading;
       console.log(y.json())
       localStorage.setItem("token",y.json().access_token)
       jQuery("#loginModal").modal("hide");
      },x=>{
        console.log('error')
      });
  }
}
