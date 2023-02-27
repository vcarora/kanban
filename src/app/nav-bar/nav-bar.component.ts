import { Component, Host, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ScrollDispatcher, CdkScrollable } from "@angular/cdk/scrolling";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,  private scrollDispatcher: ScrollDispatcher,
    ) {}


    ngOnInit(): void {
      this.scrollDispatcher.scrolled().subscribe((event: any) => {
        const scroll = event.measureScrollOffset("top");
        if (scroll > 0) {
          this.navbar_var = true
          console.log("heloo");
          
        } else {
          this.navbar_var = false;
        }
      });
    }

  navbar_var=false;

  // @HostListener("window.scroll")
  // scrollevent(){
    // if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
      // this.navbar_var = true;
    // }
    // else{
      // this.navbar_var= false;
    // }
  // }


}
