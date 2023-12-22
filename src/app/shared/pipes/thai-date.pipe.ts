import { Pipe, PipeTransform } from '@angular/core';

const ThaiDay = [
  'อาทิตย์',
  'จันทร์',
  'อังคาร',
  'พุธ',
  'พฤหัสบดี',
  'ศุกร์',
  'เสาร์',
];

const ThaiMonth = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
];

@Pipe({
  name: 'thaiDate',
  standalone: true,
})
export class ThaiDatePipe implements PipeTransform {
  transform(value: Date) {
    if (!(value instanceof Date)) value = new Date(value);
    const minute = value.getMinutes();
    const hour = value.getHours();
    const date = value.getDate();
    const day = value.getDay();
    const month = value.getMonth();
    const year = value.getFullYear();
    return `วัน${ThaiDay[day]}ที่ ${date} ${ThaiMonth[month]} ${year} เวลา ${hour}:${minute}`;
  }
}
