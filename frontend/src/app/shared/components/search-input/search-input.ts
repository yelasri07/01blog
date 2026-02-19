import { Component, HostListener, inject, input, OnDestroy, signal } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { SearchService } from '../../../core/services/search.service';
import { searchInterface } from '../../../core/interfaces/search.interface';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput implements OnDestroy {
  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  private searchService = inject(SearchService);

  searchData = signal<searchInterface | null>(null);

  placeholder = input("Search...");

  constructor() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.search(value);
    })
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  handleSearch(event: Event) {
    const target = event.target as HTMLInputElement
    this.searchSubject.next(target.value)
  }

  private search(value: string) {
    if (value.trim() === '') this.searchData.set(null)
    if (value.trim().length > 0) this.searchService.searchByUsersAndBlogs(value).subscribe(res => {
      this.searchData.set(res);
      console.log(this.searchData())
    })
  }

  @HostListener("document:click")
  hideSearchResult() {
    console.log('first')
  }
}
