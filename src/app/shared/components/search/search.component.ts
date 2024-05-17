import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UntypedFormControl} from "@angular/forms";
import {CoreService} from "@servicesApp/core";
import {ColumnModel} from "@models/core";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() columns: ColumnModel[] = [];
  @Input() records: any[] = [];
  @Input() paginatorIn;
  @Output() selectedRecordOut: EventEmitter<any> = new EventEmitter<any>();
  @Output() displayModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() paginatorOut: EventEmitter<number> = new EventEmitter<number>();
  @Output() searchOut: EventEmitter<string> = new EventEmitter<string>();
  isLoading: boolean = false;
  items: MenuItem[] = [];
  search: UntypedFormControl = new UntypedFormControl('');
  progressBarDelete: boolean = false;
  selectedRecords: any[] = [];

  constructor(private coreService: CoreService) {
    this.paginatorIn = this.coreService.paginator

    this.search.valueChanges.pipe(debounceTime(600)).subscribe((value: string | undefined) => {
      this.searchOut.emit(value);
    })
  }

  ngOnInit(): void {

  }

  select(record: any) {
    this.selectedRecordOut.emit(record);
    this.displayModal.emit(false);
  }

  paginate(event: any) {
    // this.paginatorIn.page = event.page + 1;
    this.paginatorOut.emit(event.page + 1);
  }

  catalogues() {

  }
}
