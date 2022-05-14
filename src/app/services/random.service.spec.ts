import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RandomService } from './random.service';

describe('RandomService', () => {
  let service: RandomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RandomService],
    });
    service = TestBed.inject(RandomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should count words from body of text', () => {
    const text =
      'Yoshinoya is in business to create the structure and systems needed to allow our customers access to the majority of their away-from-home daily meal requirements on a one-stop-shop basis. All our products shall be of the highest quality and value, be healthy, nutritious and provided with outstanding personal services at the lowest possible prices consistent with a fair return on investment for our shareholders, job enhancementsecurity for our employees and a level of community involvement by everyone connected with our business. All of our products and services shall be delivered consistently and measured one satisfied customer at a time, whether by company-owned or franchised operations, in superior, clean, convenient, fun and friendly neighborhood environments. We pledge to make Yoshinoya the best place to eat and the best place to work.';
    const data = [
      {
        text: 'and',
        occurences: 8,
      },
      {
        text: 'to',
        occurences: 6,
      },
      {
        text: 'the',
        occurences: 6,
      },
      {
        text: 'our',
        occurences: 6,
      },
      {
        text: 'of',
        occurences: 4,
      },
      {
        text: 'a',
        occurences: 4,
      },
      {
        text: 'be',
        occurences: 3,
      },
      {
        text: 'with',
        occurences: 3,
      },
      {
        text: 'yoshinoya',
        occurences: 2,
      },
      {
        text: 'in',
        occurences: 2,
      },
    ];
    const wordsCounted = service.countWords(text);
    expect(wordsCounted).toEqual(data);
  });
});
