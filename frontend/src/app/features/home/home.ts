import { Component } from '@angular/core';
import { SearchInput } from "../../shared/components/search-input/search-input";
import { BlogsComponent } from "../../shared/components/blogs.component/blogs.component";

@Component({
  selector: 'app-home',
  imports: [SearchInput, BlogsComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
