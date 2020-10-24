import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../app-menus';
@Component({
  selector: 'agile-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
