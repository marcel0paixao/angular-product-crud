import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [ MatToolbarModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the footer text', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('Developed by marcel0paixao');
  });

  it('should call GoToGitHub', () => {
    const goToGitHubSpy = spyOn(component, 'goToGitHub');
    const button = fixture.nativeElement.querySelector('span strong');
    button.click();
    expect(goToGitHubSpy).toHaveBeenCalled();
  });

  // test if variable GITHUB_LINK is correct
  it('should have the correct GitHub link', () => {
    expect(component.GITHUB_LINK).toBe('https://github.com/marcel0paixao/');
  });
});
