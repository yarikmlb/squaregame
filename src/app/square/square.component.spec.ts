/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { SquareComponent } from './square.component';

describe('Component: Square', () => {
  it('should create an instance', () => {
    let component = new SquareComponent();
    expect(component).toBeTruthy();
  });
});
