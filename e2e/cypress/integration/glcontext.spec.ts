/// <reference types="cypress"/>

import { expect } from 'chai';

import { Ids } from '../../../src/app/constants';
import * as Utils from '../../../src/utils/utils';

class MainPage {
  visit() {
    cy.visit('/');
  }

  get canvas() {
    return cy.get(`#${Ids.webglCanvas}`);
  }
}

const page = new MainPage();

describe('google search', () => {
  it('should work', () => {
    page.visit();
    // eslint-disable-next-line no-unused-vars

    page.canvas.then(canvas => {
      const c = canvas[0] as HTMLCanvasElement;

      cy.window().trigger('keydown', { keyCode: 49 });

      const glContext = Utils.getGLContext(c);
      expect(glContext.error).to.equal('');
    });
  });
});
