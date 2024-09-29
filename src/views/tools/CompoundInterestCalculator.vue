<template>
  <div class="main">
    <div class="form-container">
      <div class="step">
        <div class="step-title">Initial</div>
        <div class="input-groups">
          <div>
            <label for="initial_investment" class="form-label">
              Initial Investment
            </label>
            <div class="input-group">
              <span class="input-group-text" id="initialInvestmentHelpBlock">
                <i class="fa-solid fa-dollar-sign"></i>
              </span>
              <input
                type="number"
                id="initial_investment"
                class="form-control"
                aria-describedby="initialInvestmentHelpBlock"
                v-model="initial_investment"
              />
            </div>
            <div id="initialInvestmentHelpBlock" class="form-text">
              Amount of money that you have available to invest initially.
            </div>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-title">Contribute</div>
        <div class="input-groups">
          <div>
            <label for="addition" class="form-label"
              >Monthly Contribution</label
            >
            <div class="input-group">
              <span class="input-group-text" id="additionHelpBlock">
                <i class="fa-solid fa-calendar-plus"></i>
              </span>
              <input
                type="number"
                id="addition"
                class="form-control"
                aria-describedby="additionHelpBlock"
                v-model="addition"
              />
            </div>
            <div id="additionHelpBlock" class="form-text">
              Amount that you plan to add to the principal every month, or a
              negative number for the amount that you plan to withdraw every
              month.
            </div>
          </div>
          <div>
            <label for="years" class="form-label"
              >Length of Time in Years</label
            >
            <div class="input-group">
              <span class="input-group-text" id="yearsHelpBlock">
                <i class="fa-solid fa-calendar-alt"></i>
              </span>
              <input
                type="number"
                id="years"
                class="form-control"
                aria-describedby="yearsHelpBlock"
                v-model="years"
              />
            </div>
            <div id="yearsHelpBlock" class="form-text">
              Length of time, in years, that you plan to save.
            </div>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-title">Interest Rate</div>
        <div class="input-groups">
          <div>
            <label for="interest_rate" class="form-label"
              >Estimated Interest Rate</label
            >
            <div class="input-group">
              <span class="input-group-text" id="interestRateHelpBlock">
                <i class="fa-solid fa-percentage"></i>
              </span>
              <input
                type="number"
                id="interest_rate"
                class="form-control"
                aria-describedby="interestRateHelpBlock"
                v-model="interest_rate"
              />
            </div>
            <div id="interestRateHelpBlock" class="form-text">
              Your estimated annual interest rate.
            </div>
          </div>
          <div>
            <label for="interest_rate_variance" class="form-label"
              >Interest rate variance range</label
            >
            <div class="input-group">
              <span class="input-group-text" id="interestRateVarianceHelpBlock">
                <i class="fa-solid fa-arrows-alt-h"></i>
              </span>
              <input
                type="number"
                id="interest_rate_variance"
                class="form-control"
                aria-describedby="interestRateVarianceHelpBlock"
                v-model="interest_rate_variance"
              />
            </div>
            <div id="interestRateVarianceHelpBlock" class="form-text">
              Range of interest rates (above and below the rate set above) that
              you desire to see results for.
            </div>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-title">Frequency</div>
        <div class="input-groups">
          <div>
            <label for="compound_frequency" class="form-label"
              >Compound Frequency</label
            >
            <div class="input-group">
              <span class="input-group-text" id="compoundFrequencyHelpBlock">
                <i class="fa-solid fa-sync-alt"></i>
              </span>
              <select
                id="compound_frequency"
                class="form-select"
                aria-describedby="compoundFrequencyHelpBlock"
                v-model="compound_frequency"
              >
                <option value="annually">Annually</option>
                <option value="semiannually">Semiannually</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            <div id="compoundFrequencyHelpBlock" class="form-text">
              Times per year that interest will be compounded.
            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="btn btn-primary" @click="calculate">Calculate</button>
      </div>
    </div>
    <div class="result-container" v-if="result || error">
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      <div v-else>
        <h2>Result</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const initial_investment = ref(null);
const addition = ref(null);
const years = ref(null);
const interest_rate = ref(null);
const interest_rate_variance = ref(null);
const compound_frequency = ref('annually');
const error = ref(null);

const calculate = () => {
  console.log(initial_investment.value);
  console.log(addition.value);
  console.log(years.value);
  console.log(interest_rate.value);
  console.log(interest_rate_variance.value);
  console.log(compound_frequency.value);
  error.value = validateFields();
  if (error.value) {
    return;
  }
  calculateSavings();
};

const validateFields = () => {
  if (
    initial_investment.value === null ||
    years.value === null ||
    interest_rate.value === null ||
    compound_frequency.value === null
  ) {
    return 'All fields are required.';
  }

  if (
    initial_investment.value <= 0 ||
    years.value <= 0 ||
    interest_rate.value <= 0 ||
    interest_rate_variance.value <= 0 ||
    compound_frequency.value <= 0
  ) {
    return 'All fields must be positive numbers.';
  }

  return null;
};

// https://apexcharts.com/vue-chart-demos/range-area-charts/combo/

const calculateSavings = () => {
  error.value = 'Calculating is not ready yet.';
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.step {
  padding: 0 20px 20px 20px;
  width: 80%;

  &:not(:nth-last-of-type(2)) {
    border-bottom: dashed 2px var(--color-border);
  }
}

.step-title {
  font-weight: bold;
  margin-bottom: 25px;
  font-size: 1.3em;
}

.input-groups {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
