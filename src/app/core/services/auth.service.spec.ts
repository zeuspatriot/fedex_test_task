import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthServiceService', () => {
  let service: AuthService;
  const HttpClientMock = {
    post: jasmine.createSpy('post')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{
        provide: HttpClient, useValue: HttpClientMock 
      }]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('signUp method should post to http service with correct params', () => {
    const TEST_DATA = {
      firstName: 'Test',
      lastName: 'Best',
      email: 'test@best.com',
    };
    service.signUp(TEST_DATA);

    expect(HttpClientMock.post).toHaveBeenCalledWith('https://demo-api.now.sh/users', TEST_DATA);
  })

});
