import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  myForm!: FormGroup;
  showAlert: boolean = false;
  alertType: string = '';
  alertMessage: string = '';

  constructor(private titleService: Title,private fb: FormBuilder){
    titleService.setTitle("Contact | Portfolio")
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;

      emailjs.send('service_luj3gqf', 'template_t103b7s', formData, 'dSf8dyVz5eLf5UM8-')
        .then((response) => {
          console.log('Email sent successfully:', response);
          this.alertMessage = 'Email sent successfully';
          this.alertType = 'success';
          this.showAlert = true;
          this.myForm.reset();
        }, (error) => {
          console.error('Error sending email:', error);
          this.alertMessage = 'Error sending email. Please try again later.';
          this.alertType = 'danger';
          this.showAlert = true;
      });
    } 
    else 
    {
      this.alertMessage = 'Please fill out all required fields.';
      this.alertType = 'danger';
      this.showAlert = true;
    }
  }
}
