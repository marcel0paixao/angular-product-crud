import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit {
  @Input('myForEm') numbers: number[] | undefined
  @Input('myForUsando') texto: String | undefined

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {
    console.log('MyFor');

  }

  ngOnInit(): void {
    for(let number of this.numbers ?? []){
      this.container.createEmbeddedView(this.template, { $implicit : number })
    }
  }
}
