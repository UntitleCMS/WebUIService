import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';

@Component({
  selector: 'LandingPage',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  private auth = inject(AuthenticationService);

  title = 'โปรแกรมเมอร์มือหนึ่ง';
  description =
    'เบต้าบล็อกให้บริการในการเขียนบทความในรูปแบบบล็อก โดยอำนวยความสะดวกให้โปรแกรมเมอร์โดยการเพิ่มฟังก์ชันในการเขียนโค้ด และสั่งให้โค้ดทำงาน ขณะนี้ ระบบของเราให้บริการในภาษา C, Python, Java';

  login() {
    this.auth.login();
  }
}
