import { TestBed, async } from '@angular/core/testing';
import { PacPoliticsComponent } from './app.component';

describe('PacPoliticsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PacPoliticsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PacPoliticsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pac-politics'`, () => {
    const fixture = TestBed.createComponent(PacPoliticsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('pac-politics');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(PacPoliticsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to pac-politics!');
  });
});
