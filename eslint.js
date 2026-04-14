import getXoConfigs from 'eslint-config-xo';
import tidyConfigs from './index.js';

// Returns a complete config for use with ESLint directly rather than via XO
const configs = [
    ...getXoConfigs(),
    ...tidyConfigs
];

export default configs;
