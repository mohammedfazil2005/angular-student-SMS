import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {
    this.accessToken=localStorage.getItem("token")||""
  }

  accessToken:string=""


  onLogin(body:any){
    return this.http.post("/login",body)
  }


  fetchStudents(){
    return this.http.get('/getstudentdetails')
  }

  fetchAllSubjects(){
    return this.http.get("/getallsubjects")
  }
  addStudent(body:any){
    return this.http.post("/addstudent",body)
  }
  onGetSingleStudent(){
    return this.http.get(`/getsingle/student/`)
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

  onDeleteSubjects(id:number){
    return this.http.delete(`/deletesubject/${id}`)
  }

    onGetSingleStudentAdmin(id:number){
    return this.http.get(`/getsingle/student/admin?id=${id}`)
  }

  onUpdateProfile(id:number,body:any){
    return this.http.patch(`/updateimage/${id}`,body)
  }
  onLogout(){
    return this.http.post(`/logout`,{})
  }

  onRefreshToken(){
    return this.http.post("/refreshtoken",{})
  }





}
