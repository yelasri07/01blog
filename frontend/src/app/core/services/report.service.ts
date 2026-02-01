import { inject, Injectable } from '@angular/core';
import { API_URL } from '../constants/API_URL';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private http = inject(HttpClient)

  submitReport(reason: string, targetId: number, reportType: "USER" | "BLOG") {
    return this.http.post<{ message: string }>(API_URL + "/reports", {
      reason: reason,
      type: reportType,
      target_id: targetId
    })
  }
}
