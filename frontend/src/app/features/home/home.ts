import { Component } from '@angular/core';
import { SearchInput } from "../../shared/components/search-input/search-input";

@Component({
  selector: 'app-home',
  imports: [SearchInput],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
