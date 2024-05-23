import { scenario2 } from "./scenario-2.js";
import { scenario3 } from "./scenario-3.js";

/**
 * @typedef {import("../types/scenario.types.js").Scenario} Scenario
 *
 * The scenario definitions
 * @type {Object.<number, Scenario>}
 */
export const Scenarios = {
  [2]: scenario2,
  [3]: scenario3,
};
