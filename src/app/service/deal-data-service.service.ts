import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DealDataServiceService {

  private apiUrl = '/api/doctor-data';
  private apiPostUrl = '/api/insert-doctor';
  private apiPutUrl = '/api/update-doctor';
  private apiDeleteUrl = '  /api/delete-doctor';

  constructor(private http: HttpClient) { }

  getDoctorData(): Observable<DoctorData[]> {
    return this.http.get<DoctorData[]>(this.apiUrl);
  }

  sendDoctorData(data: sendDoctorData): Observable<DoctorData[]> {
    return this.http.post<DoctorData[]>(this.apiPostUrl, data);
  }

  updateDoctorData(data: DoctorData): Observable<DoctorData[]> {
    return this.http.put<DoctorData[]>(this.apiPutUrl, data);
  }

  deleteDoctorData(id: number): Observable<DoctorData[]> {
    return this.http.delete<DoctorData[]>(this.apiDeleteUrl + '?id=' + id);
  }
}


// 假设 DoctorData 表示医生数据的接口或类型
interface DoctorData {
  DOCTOR_ID: number;
  NAME: string;
  MEDICALDEGREE: string;
  QUALIFICATION: string;
  SPECIALTY_NAME: string;
}

interface sendDoctorData {
  NAME: string;
  MEDICALDEGREE: string;
  QUALIFICATION: string;
  SPECIALTY_NAME: string;
}
