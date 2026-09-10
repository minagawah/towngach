/**
 * Reports that a historical Purple-White rule
 * has not been specified.
 *
 * @module purple_white/core/utils/method
 *
 * @param {string} method
 * @param {string} period
 * @throws {Error}
 */
export const build_method_result = (method, period) => {
  const error = new Error(
    `Historical rule is unresolved: ${method} (${period}).`
  );
  error.code = 'UNRESOLVED_HISTORICAL_RULE';
  throw error;
};
