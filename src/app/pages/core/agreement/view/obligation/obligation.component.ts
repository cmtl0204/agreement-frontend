import {Component, inject, Input, OnInit} from '@angular/core';
import {CoreService} from "@servicesApp/core";
import {CompanyRegistrationFormEnum, SkeletonEnum} from "@shared/enums";

interface Order {
  id: string;
  productCode: string;
  date: string;
  amount: number;
  quantity: number;
  customer: string;
  status: string;
  names: string[];
}

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
  orders: Order[];
}

@Component({
  selector: 'app-obligation',
  templateUrl: './obligation.component.html',
  styleUrls: ['./obligation.component.scss']
})
export class ObligationComponent implements OnInit {

  /** Services **/
  protected readonly coreService = inject(CoreService);

  /** Form **/
  @Input() id!: string;


  /** Enums **/
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly CompanyRegistrationFormEnum = CompanyRegistrationFormEnum;

  //validation

  products: Product[] = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
      orders: [
        {
          id: "1000-0",
          productCode: "f230fh0g3",
          date: "2020-09-13",
          amount: 65,
          quantity: 1,
          customer: "David James",
          status: "PENDING",
          names: ["test1", "test2", "test3"]
        },
        {
          id: "1000-1",
          productCode: "f230fh0g3",
          date: "2020-05-14",
          amount: 130,
          quantity: 2,
          customer: "Leon Rodrigues",
          status: "DELIVERED",
          names: ["test1", "test2", "test3"]
        },
        {
          id: "1000-2",
          productCode: "f230fh0g3",
          date: "2019-01-04",
          amount: 65,
          quantity: 1,
          customer: "Juan Alejandro",
          status: "RETURNED",
          names: ["test1", "test2", "test3"]
        },
        {
          id: "1000-3",
          productCode: "f230fh0g3",
          date: "2020-09-13",
          amount: 195,
          quantity: 3,
          customer: "Claire Morrow",
          status: "CANCELLED",
          names: ["test1", "test2", "test3"]
        }
      ]
    },
    {
      id: "1001",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      quantity: 61,
      inventoryStatus: "INSTOCK",
      rating: 4,
      orders: [
        {
          id: "1001-0",
          productCode: "nvklal433",
          date: "2020-05-14",
          amount: 72,
          quantity: 1,
          customer: "Maisha Jefferson",
          status: "DELIVERED",
          names: ["test1", "test2", "test3"]
        },
        {
          id: "1001-1",
          productCode: "nvklal433",
          date: "2020-02-28",
          amount: 144,
          quantity: 2,
          customer: "Octavia Murillo",
          status: "PENDING",
          names: ["test1", "test2", "test3"]
        }
      ]
    }
  ];

  expandedRows: { [key: string]: boolean } = {};
  expandedOrderRows: { [key: string]: boolean } = {};

  constructor() {
  }

  ngOnInit() {
  }

  expandAll() {
    this.expandedRows = this.products.reduce((acc: { [key: string]: boolean }, p: Product) => {
      acc[p.id] = true;
      return acc;
    }, {});

    this.expandedOrderRows = this.products.reduce((acc: { [key: string]: boolean }, p: Product) => {
      p.orders.forEach((order: Order) => {
        acc[order.id] = true;
      });
      return acc;
    }, {});
  }

  collapseAll() {
    this.expandedRows = {};
    this.expandedOrderRows = {};
  }

}
