import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { Observable, of } from 'rxjs';
import { Exercise } from './exercise';
import { SignUpService } from '../User-operations/user.service';


@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private router: Router, private cookieService: NgxEncryptCookieService, private http: HttpClient, private userService: SignUpService) { }
  headers = new Headers();  

  createLab(labStudents: string, labName: string){

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  

    console.log(JSON.stringify({studentNames: labStudents, name: labName}));
    

    fetch('https://apps-lapp-server.herokuapp.com/api/management/createLab', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic '+btoa(authString), 
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({studentNames: labStudents, name: labName}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.router.navigate(['/dashboard']);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  createExercise(model: Exercise){

    let authString = `${this.cookieService.get('username', false)}:${this.cookieService.get('password', false)}`  
    

      fetch('https://apps-lapp-server.herokuapp.com/api/management/createExercise', {
        method: 'POST',
        headers: new Headers({
        'Authorization': 'Basic '+btoa(authString), 
        'Content-Type': 'application/json'
      }),
        body: JSON.stringify(model),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  getAllExercises(): Observable<string[]> {

    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`  

  let  headerHttp = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' + btoa(authString)
  });
    
  //  return this.http.get<string[]>('https://apps-lapp-server.herokuapp.com/api/management/getAllExercises', {headers: headerHttp}, )
    return of(['cv1']);
  }

  async getAllExercises1(){

    let authString = `${this.userService.cookieService.get('username', false)}:${this.userService.cookieService.get('password', false)}`  
    console.log(authString);
    

    this.headers.set('Authorization', 'Basic ' + btoa(authString))

    let aaaaaaaaaaaa = await fetch('https://apps-lapp-server.herokuapp.com/api/management/getAllExercises', {
      method: 'GET',
      headers: this.headers})
      return aaaaaaaaaaaa.json();
  }
}



