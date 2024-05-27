import { scenario1 } from './scenario-1.js';
import { scenario2 } from './scenario-2.js';
import { scenario3 } from './scenario-3.js';
import { scenario4 } from './scenario-4.js';
import { scenario5 } from './scenario-5.js';

/**
 * @typedef {import("../types/scenario.types.js").Scenario} Scenario
 *
 * The scenario definitions
 * @type {Object.<number, Scenario>}
 */
export const Scenarios = {
  [1]: scenario1,
  [2]: scenario2,
  [3]: scenario3,
  [4]: scenario4,
  [5]: scenario5,
};
