import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Customer {
  id?: number|undefined;
  name: string | undefined;
  city: string | undefined;
  contact: string | undefined;
}

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  public customer: Customer = {
    name: undefined,
    city: undefined,
    contact: undefined,
  };

  public customers: Customer[] = [];

  constructor() {
    this.getAllCustomers();
  }

  saveCustomer() {
    console.log(this.customer);

    fetch("http://localhost:8080/customer", {
      method: 'POST',
      body: JSON.stringify(this.customer),
      headers: { "Content-type": "application/json" }
    })
    .then(() => {
      this.getAllCustomers(); 
    })
    .catch(error => console.error('Error saving customer:', error));
  }

  getAllCustomers() {
    fetch("http://localhost:8080/customer")
      .then(response => response.json())
      .then((data: Customer[]) => {
        this.customers = data;
        console.log(this.customers);
      })
      .catch(error => console.error('Error fetching customers:', error));
  }

  deleteCustomer(id: any) {
    fetch(`http://localhost:8080/customer/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      this.getAllCustomers();  
    })
    .catch(error => console.error('Error deleting customer:', error));
  }
}
