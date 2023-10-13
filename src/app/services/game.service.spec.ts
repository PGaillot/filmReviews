import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;
  let simpleTestString: string = '';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  describe('- Get words score', () => {

    it('words of less than 3 letters', () => {
      expect(service.getWordScore('un')).toEqual(0);
      expect(service.getWordScore('Le')).toEqual(0);
      expect(service.getWordScore('est')).toEqual(0);
    })

    it('words of longer than 3 letters', () => {
      expect(service.getWordScore('test')).toEqual(2);
      expect(service.getWordScore('maison')).toEqual(2.4);
      expect(service.getWordScore('guitare')).toEqual(2.6);
    })


  })

  describe('- Generate Words Array with "Un test simple."', () => {
    beforeEach(() => {
      simpleTestString = "Un test simple.";
    })

    it(`Generate Words Arra is [\'Un\', \'test\', \'simple\']`, () => {
      expect(service.generateWordsArray(simpleTestString)).toEqual(['Un', 'test', 'simple'])
    })

    it(`Generate Words Arra at a length of 3`, () => {
      expect(service.generateWordsArray(simpleTestString).length).toEqual(3)
    })
  })

  describe('- Generate Words Array with "l\'année de Jean-Pierre."', () => {
    beforeEach(() => {
      simpleTestString = "l\'année de Jean-Pierre...";
    })

    it(`Generate Words Array is [\'l\', \'année\', \'de\, \'Jean-Pierre\']`, () => {
      expect(service.generateWordsArray(simpleTestString)).toEqual(['l', 'année', 'de', 'Jean-Pierre'])
    })

    it(`Generate Words Arra at a length of 4`, () => {
      expect(service.generateWordsArray(simpleTestString).length).toEqual(4)
    })
  })


  describe('Generate keywords', () => {
    beforeEach(() => {
      simpleTestString = "Un test simple.";
    })

    it('Generate keywords => \'Un test simple.\'', () => {
      expect(service.generateKeywordsArray(simpleTestString).length).toEqual(3)
      expect(service.generateKeywordsArray(simpleTestString)[0].keyword).toEqual('Un')
      expect(service.generateKeywordsArray(simpleTestString)[0].score).toEqual(0)
      expect(service.generateKeywordsArray(simpleTestString)[2].score).toEqual(2.4)
    })

  })


  describe('Check accents', () => {
    beforeEach(() => {
      // simpleTestString = 'Haïr Août où île ïle Maître île Pâle Aoûtât jattes Crème Naïve Noël Côte Îlot Bûche Hôpital Forêt Île Théâtre Déçu';
      simpleTestString = 'Aoûtât Forêt Théâtre Déçu';
    })
    it('Haïr Août où ...', () => {
      expect(service.generateKeywordsArray(simpleTestString)).toBeTruthy();
    })
    it('énervé', () => {
      expect(service.checkAccentsLetters(service.generateKeywordsArray('énervé')[0])).toBeTruthy();
    })
  })

});
