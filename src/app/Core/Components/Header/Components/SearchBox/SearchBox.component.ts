import { Component, Output, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'search-box',
  templateUrl: './SearchBox.component.html',
  styleUrls: [ './SearchBox.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})

export class SearchBox {
    @ViewChild('boxReference') boxReference: ElementRef;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    value: FormControl = new FormControl();

    constructor(){
        this.value.valueChanges
                  .pipe(debounceTime(600))
							   .subscribe((value: string) => {
			this.onChange.emit(value);
		});
    }

    reset(): void {
        this.boxReference.nativeElement.value = null;
    }

    clear(): void {
        this.reset();
        this.onChange.emit(null);
    }
}
