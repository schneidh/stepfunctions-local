const { isValidArn } = require('../tools/validate');
const { errors, parameters } = require('../../constants');

function describeExecution(params, executions) {
  /* check request parameters */
  if (typeof params.executionArn !== 'string'
    || params.executionArn.length < parameters.arn.min
    || params.executionArn.length > parameters.arn.max
  ) {
    throw new Error(`${errors.common.INVALID_PARAMETER_VALUE}: --execution-arn`);
  }

  /* execute action */
  if (!isValidArn(params.executionArn, 'execution')) {
    throw new Error(errors.describeExecution.INVALID_ARN);
  }
  const match = executions.find(e => e.executionArn === params.executionArn);
  if (!match) {
    throw new Error(errors.describeExecution.EXECUTION_DOES_NOT_EXIST);
  }

  return {
    response: {
      executionArn: match.executionArn,
      input: match.input,
      name: match.name,
      output: match.output,
      startDate: match.startDate,
      stateMachineArn: match.stateMachineArn,
      status: match.status,
      stopDate: match.stopDate,
    },
  };
}

module.exports = describeExecution;
