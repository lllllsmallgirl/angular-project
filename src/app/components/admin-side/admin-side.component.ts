import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DealDataServiceService } from 'src/app/service/deal-data-service.service';

@Component({
  selector: 'app-admin-side',
  templateUrl: './admin-side.component.html',
  styleUrls: ['./admin-side.component.scss']
})
export class AdminSideComponent implements OnInit {
  list: any;
  options: any = [
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Dermatology', label: 'Dermatology' },
    { value: 'Orthopedics', label: 'Orthopedics' },
    { value: 'Pediatrics', label: 'Pediatrics' },
    { value: 'Gynecology', label: 'Gynecology' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Ophthalmology', label: 'Ophthalmology' },
    { value: 'Urology', label: 'Urology' }
  ];//存储医生的专业
  idOptions: any

  // 创建一个响应式表单
  doctorForm: FormGroup;
  updateDoctorForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dealDataService: DealDataServiceService) {
    // 初始化表单控件
    this.doctorForm = this.formBuilder.group({
      NAME: ['', Validators.required],
      MEDICALDEGREE: ['', Validators.required],
      QUALIFICATION: ['', Validators.required],
      SPECIALTY_NAME: ['', Validators.required]
    });

    this.updateDoctorForm = this.formBuilder.group({
      DOCTOR_ID: ['', Validators.required], // 初始值为空
      NAME: ['', Validators.required],
      MEDICALDEGREE: ['', Validators.required],
      QUALIFICATION: ['', Validators.required],
      SPECIALTY_NAME: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.dealDataService.getDoctorData().subscribe((res: any) => {
      console.log(res.data);
      this.list = res.data;
      this.getAllId(res.data)


    })
  }
  // 处理保存按钮点击事件
  onInsertSave() {
    // 获取表单数据
    const formData = this.doctorForm.value;
    // 执行保存操作，可以将 formData 发送到后端或执行其他操作
    console.log('保存的数据：', formData);
    this.dealDataService.sendDoctorData(formData).subscribe((response: any) => {
      // 处理响应，可以在这里执行成功后的操作
      this.list = response.data;
      this.getAllId(response.data)
      alert('Insert successful')

    }, error => {
      // 处理错误，可以在这里处理请求失败的情况
      console.error('保存失败：', error);
      alert('Insert failed')

    });
  }

  onUpdateSave() {
    // 获取表单数据
    const formData = this.updateDoctorForm.value;
    // 执行保存操作，可以将 formData 发送到后端或执行其他操作
    console.log('保存的数据：', formData);
    this.dealDataService.updateDoctorData(formData).subscribe((response: any) => {
      // 处理响应，可以在这里执行成功后的操作
      this.list = response.data;
      this.getAllId(response.data);
      alert('Update successful')
    }, error => {
      // 处理错误，可以在这里处理请求失败的情况
      console.error('保存失败：', error);
      alert('Update failed')

    });
  }

  deleteDoctor(id: any, event: any) {
    event.preventDefault();//阻止默认跳转
    this.dealDataService.deleteDoctorData(id).subscribe((res: any) => {
      this.list = res.data;
      this.getAllId(res.data)
      alert('Delete successful')

    }, error => {
      // 处理错误，可以在这里处理请求失败的情况
      console.error('保存失败：', error);
      alert('Delete failed')

    })
  }

  getAllId(res: any) {
    const doctorOptions: any = [];
    res.forEach((doctor: any) => {
      const doctorId = doctor.DOCTOR_ID;
      doctorOptions.push({ value: doctorId, label: doctorId });
    });
    this.idOptions = doctorOptions;
  }
}
