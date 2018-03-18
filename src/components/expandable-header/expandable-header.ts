import { Component, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'expandable-header',
  templateUrl: 'expandable-header.html'
})
export class ExpandableHeaderComponent {

  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;
 
  newHeaderHeight: any;
  
  constructor(public element: ElementRef,
              public renderer: Renderer2) {
  }

  ngOnInit() {
    

    console.log('1');
    

    console.log('scrollArea: ', this.scrollArea);
    
    
    this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
    console.log('2');
    this.scrollArea.ionScroll.subscribe((ev) => {
      console.log('3');
      this.resizeHeader(ev);
      console.log('newHeaderHeight: ', this.newHeaderHeight);
      console.log('4');
    });
    
    // console.log('scrollarea: ', this.scrollArea);
    // console.log('headerHeight: ', this.headerHeight);
    
  }
  
  // ngOnInit(){
  //   this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
  //   this.scrollArea.ionScroll.subscribe((ev) => {
  //     this.resizeHeader(ev);
  //   });
  // }

  
  
  resizeHeader(ev){
      ev.domWrite(() => {
        this.newHeaderHeight = this.headerHeight - ev.scrollTop;

        this.newHeaderHeight = this.headerHeight - ev.scrollTop;

        console.log('ev: ', ev.scrollTop);
        
        if(this.newHeaderHeight < 0){
          this.newHeaderHeight = 0;
        }

        if(this.newHeaderHeight > 0){ 
          this.scrollArea.resize();
        }

        this.renderer.setStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
        
        for(let headerElement of this.element.nativeElement.children){
          let totalHeight = headerElement.offsetTop + headerElement.clientHeight;
          if (totalHeight > this.newHeaderHeight && !headerElement) {
            // headerElement = true;
            this.renderer.setStyle(headerElement, 'opacity', '0');
          } else if (totalHeight <= this.newHeaderHeight && headerElement) {
            headerElement.isHidden = false;
            this.renderer.setStyle(headerElement, 'opacity', '0.7');
          }
  
        }

      });  
    }

}
