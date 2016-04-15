function alphanumeric(str) {
  return /^\w+$/.test(str);
}

alphanumeric._name = 'alphanumeric';

module.exports = {
  alphanumeric: alphanumeric
};
