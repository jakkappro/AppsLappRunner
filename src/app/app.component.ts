import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { SignUpService } from './User-operations/user.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LabService } from './Lab-operations/lab.service';
import { User } from './User-operations/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppsLapp-web';
  showFiller = false;

  constructor(private userService: SignUpService, private cookieService: NgxEncryptCookieService, private router: Router, private bottomSheet: MatBottomSheet, private labService: LabService, private route: ActivatedRoute){
     this.userName = this.cookieService.get('username', false); 
    }

    
  isLogged: boolean = false;

  userName: string = '';
  // user = new User('', '', '', '', '', );

  signOut(){
    this.userService.logOut();
    this.userName = '';
    this.router.navigate(['/login']);
  }

  

  onSubmit(){
  }

  @ViewChild('templateBottomSheet') TemplateBottomSheet: TemplateRef<any>;

  openTemplateSheetMenu() {
    // this.getUser();
    this.bottomSheet.open(this.TemplateBottomSheet);
  }

  closeTemplateSheetMenu() {
    this.bottomSheet.dismiss();
  }

  // getUser(){
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.labService.getStudent(id).subscribe(response => {
  //     this.user = response;
  //   });
  // }
}
