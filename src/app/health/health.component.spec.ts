/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { HealthComponent } from './health.component';

describe('Component: Health', () => {
  it('should create an instance', () => {
    let component = new HealthComponent();
    expect(component).toBeTruthy();
  });
});
