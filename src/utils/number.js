const formatNumber = (value, defaultValue) => {
  // eslint-disable-next-line no-restricted-globals
  return value && !isNaN(value) ? parseInt(value, 10) : defaultValue;
};

module.exports = { formatNumber };
