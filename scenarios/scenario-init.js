import { scenario2 } from "./scenario-2";
import { scenario3 } from './scenario-3';

/**
 * @typedef {import("../types/scenario.types").Scenario} Scenario
 * 
 * The scenario definitions
 * @type {Object.<number, Scenario>}
 */
export const ScenarioDefs = {
    [2]: scenario2,
    [3]: scenario3
};