import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private elementRef:ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.querySelector('.overlay')
                                .addEventListener('click', this.goBack.bind(this));
  }

  onClick(){
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  onClickedOutside(e: Event) {
    console.log('Clicked outside:', e);
  }

  clickInside($event: Event){
    $event.preventDefault();
    $event.stopPropagation();
  }

  goBack(){
    this.router.navigate(['../'],{relativeTo: this.route})
  }

}
