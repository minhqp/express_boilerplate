const retry = (func, args, retries = 1) => {
  let flag = false;
  do {
    try {
      flag = true;
      return func.apply(this, args);
    } catch (error) {
      retries -= 1;
    }
  } while (!flag && retries);
};

module.exports = retry;
