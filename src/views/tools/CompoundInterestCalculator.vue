<template>
  <div>
    <div>
      <div>Initial Investment</div>
      <div>
        <div>
          <label for="principal" class="form-label">Initial Investment</label>
          <input
            type="number"
            id="principal"
            class="form-control"
            aria-describedby="principalHelpBlock"
          />
          <div id="principalHelpBlock" class="form-text">
            Amount of money that you have available to invest initially.
          </div>
        </div>
      </div>
    </div>
    <div>
      <div>Contribute</div>
      <div>
        <div>
          <label for="addition" class="form-label">Monthly Contribution</label>
          <input
            type="number"
            id="addition"
            class="form-control"
            aria-describedby="additionHelpBlock"
          />
          <div id="additionHelpBlock" class="form-text">
            Amount that you plan to add to the principal every month, or a
            negative number for the amount that you plan to withdraw every
            month.
          </div>
        </div>
        <div>
          <label for="years" class="form-label">Length of Time in Years</label>
          <input
            type="number"
            id="years"
            class="form-control"
            aria-describedby="yearsHelpBlock"
          />
          <div id="yearsHelpBlock" class="form-text">
            Length of time, in years, that you plan to save.
          </div>
        </div>
      </div>
    </div>
    <div>
      <div>Interest Rate</div>
      <div>
        <div>
          <label for="interest_rate" class="form-label"
            >Estimated Interest Rate</label
          >
          <input
            type="number"
            id="interest_rate"
            class="form-control"
            aria-describedby="interestRateHelpBlock"
          />
          <div id="interestRateHelpBlock" class="form-text">
            Your estimated annual interest rate.
          </div>
        </div>
        <div>
          <label for="interest_rate_variance" class="form-label"
            >Interest rate variance range</label
          >
          <input
            type="number"
            id="interest_rate_variance"
            class="form-control"
            aria-describedby="interestRateVarianceHelpBlock"
          />
          <div id="interestRateVarianceHelpBlock" class="form-text">
            Range of interest rates (above and below the rate set above) that
            you desire to see results for.
          </div>
        </div>
      </div>
    </div>
    <div>
      <div>Compound It</div>
      <div>
        <div>
          <label for="compound_interest" class="form-label"
            >Compound Frequency</label
          >
          <input
            type="number"
            id="compound_interest"
            class="form-control"
            aria-describedby="compoundInterestHelpBlock"
          />
          <div id="compoundInterestHelpBlock" class="form-text">
            Times per year that interest will be compounded.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss"></style>
