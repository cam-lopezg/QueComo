import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OpcionesComponent } from './opciones/opciones.component';


declarations: [AppComponent, HomeComponent, OpcionesComponent]

describe('AppComponent', () => {
 
})

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have menu labels', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(3);
    expect(menuItems[0].textContent).toContain('Home');
    expect(menuItems[1].textContent).toContain('Opciones');
  });

  it('should have urls', () => {
    const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  const app = fixture.nativeElement;
  const menuItems = app.querySelectorAll('ion-item');
  expect(menuItems.length).toEqual(2); // Asumiendo que solo tienes dos ítems
  expect(menuItems[0].getAttribute('routerLink')).toEqual('/home');
  expect(menuItems[1].getAttribute('routerLink')).toEqual('/opciones');
});



