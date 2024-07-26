import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { ItemComponent } from './pages/item/item.component';

export const routes: Routes = [
    {
        path:"home",
        component: HomeComponent
    },
    {
        path:"customer",
        component:CustomerComponent
    },
    {
        path:"",
        component: HomeComponent
    },
    {
        path:"item",
        component: ItemComponent
    }
];
