import { Component, OnInit } from '@angular/core';
import { DealDataServiceService } from 'src/app/service/deal-data-service.service';

@Component({
  selector: 'app-client-side',
  templateUrl: './client-side.component.html',
  styleUrls: ['./client-side.component.scss']
})
export class ClientSideComponent implements OnInit {
  list: any
  constructor(private dealDataService: DealDataServiceService) { }
  ngOnInit(): void {
    this.dealDataService.getDoctorData().subscribe((res: any) => {
      this.list = res.data;
    })
  }
}
