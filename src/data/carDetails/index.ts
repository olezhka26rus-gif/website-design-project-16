import type { CarDetails } from './types';
import { carDetailsBatch1 } from './batch1';
import { carDetailsBatch2 } from './batch2';
import { carDetailsBatch3 } from './batch3';
import { carDetailsBatch4 } from './batch4';

export type { CarDetails };

export const carDetails: Record<string, CarDetails> = {
  ...carDetailsBatch1,
  ...carDetailsBatch2,
  ...carDetailsBatch3,
  ...carDetailsBatch4,
};
