import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  fetchStudents(){
    return this.http.get('/getstudentdetails')
  }

  fetchAllSubjects(){
    return this.http.get("/getallsubjects")
  }
  addStudent(body:any){
    return this.http.post("/addstudent",body)
  }
  onGetSingleStudent(rollno:number){
    return this.http.get(`/getsingle/student/${rollno}`)
  }
  onDeleteStudent(rollno:number){
    return this.http.delete(`/deletestudent/${rollno}`)
  }

  onAddSubject(body:any){
    return this.http.post('/addsub',body)
  }

  onUpdateMarks(body:any){
    return this.http.post('/addmark',body)
  }





}
