import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Item {
  id?: number|undefined;
  name: string | undefined;
  rental_per_day: string | undefined;
  fine_per_day: string | undefined;
  availability: string | undefined;
}

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  public item: Item = {
    name: undefined,
    rental_per_day: undefined,
    fine_per_day: undefined,
    availability: undefined,
  };

  public items: Item[] = [];

  constructor() {
    this.getAllItems();
  }

  saveItem() {
    console.log(this.item);

    fetch("http://localhost:8080/item", {
      method: 'POST',
      body: JSON.stringify(this.item),
      headers: { "Content-type": "application/json" }
    })
    .then(() => {
      this.getAllItems(); 
    })
    .catch(error => console.error('Error saving item:', error));
  }

  getAllItems() {
    fetch("http://localhost:8080/item")
      .then(response => response.json())
      .then((data: Item[]) => {
        this.items = data;
        console.log(this.items);
      })
      .catch(error => console.error('Error fetching items:', error));
  }

  deleteItem(id: any) {
    fetch(`http://localhost:8080/item/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      this.getAllItems();  
    })
    .catch(error => console.error('Error deleting item:', error));
  }
}
