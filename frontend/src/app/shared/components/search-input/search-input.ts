import { Component, input, OnDestroy, signal } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput implements OnDestroy {
  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  placeholder = input("Search...");

  constructor() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(1000)
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

  }
}
