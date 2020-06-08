/**
 * @jest-environment jsdom
 */

import { Ids } from '../../src/constants';
import * as Utils from '../../src/utils/utils';

describe('Canvas', () => {
  document.body.innerHTML = `
    <canvas id="${Ids.webglCanvas}" width="800" height="600"></canvas>
  `;

  it('should return a canvas element', () => {
    const canvasResult = Utils.getCanvas(Ids.webglCanvas, document.body);
    expect(canvasResult.valid).toBe(true);
  });
});
