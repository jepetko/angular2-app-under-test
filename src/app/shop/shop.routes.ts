import {ShopComponent} from './shop.component';
import {Routes} from '@angular/router';

export const SHOP_ROUTES: Routes = [
    {path: '', redirectTo: '/shop', pathMatch: 'full'},
    {path: 'shop', component: ShopComponent}
];
