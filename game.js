import { ScenarioBuilder } from "./scenario-builder/scenario-builder.js";
import { Scenarios } from "./scenarios/scenarios.js";

(function () {
  const scenarioBuilder = new ScenarioBuilder();

  document
    .querySelector("#scenarioSelect")
    .addEventListener("change", function () {
      document.querySelector(".scenario-details").style.display = "block";
      scenarioBuilder.buildScenario(Scenarios[this.value]);
    });

  /**
   * Sets the number of players
   * @param {number} numberOfPlayers
   */
  function changePlayers(numberOfPlayers) {
    if (scenarioBuilder.currentScenario)
      scenarioBuilder.buildScenario(
        scenarioBuilder.currentScenario,
        numberOfPlayers
      );
  }

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      changePlayers(+radio.value);
    });
  });
})();
