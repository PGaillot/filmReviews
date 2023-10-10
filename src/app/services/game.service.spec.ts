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
      expect(service.generateKeywordsArray(service.generateWordsArray(simpleTestString)).length).toEqual(3)
      expect(service.generateKeywordsArray(service.generateWordsArray(simpleTestString))[0].keyword).toEqual('Un')
      expect(service.generateKeywordsArray(service.generateWordsArray(simpleTestString))[0].score).toEqual(0)
      expect(service.generateKeywordsArray(service.generateWordsArray(simpleTestString))[2].score).toEqual(2.4)
    })

    it('Generate keywords => \'Un test Majuscule.\'', () => {
      expect(service.generateKeywordsArray(['Un', 'test', 'Majuscule']).length).toEqual(3)
    })

    it('Generate keywords => \'Un test CAPSLOCK.\'', () => {
      expect(service.generateKeywordsArray(['Un', 'test', 'CAPSLOCK']).length).toEqual(3)
      expect(service.generateKeywordsArray(['Un', 'test', 'CAPSLOCK']).filter(kw => kw.keyword === 'capslock')).toBeTruthy()
    })
  })

  describe('Check accent marks on Keyword Array', () => {

    beforeEach(() => {
      simpleTestString = "Un test simple.";
    })

    it('Check accent marks => \'Un test simple.\'', () => {
      expect(service.generateKeywordsArray(['Un', 'test', 'simple']).length).toEqual(3)
    })
  })

  describe('Check accent marks on Keyword Array', () => {
    beforeEach(() => {
      simpleTestString = "Un test Majuscule.";
    })

    it('Check accent marks => \'Un test Majuscule.\'', () => {
      expect(service.generateKeywordsArray(service.generateWordsArray(simpleTestString)).length).toEqual(3)
    })
  })

  describe('Check accent marks on Keyword Array', () => {
    beforeEach(() => {
      simpleTestString = "Un test CAPSLOCK.";
    })

    it('Check accent marks => \'Un test CAPSLOCK.\'', () => {
      expect(service.generateKeywordsArray(service.generateWordsArray(simpleTestString)).length).toEqual(3)
      expect(service.generateKeywordsArray(service.generateWordsArray(simpleTestString)).filter(kw => kw.keyword === 'capslock')).toBeTruthy()
    })
  })

});
