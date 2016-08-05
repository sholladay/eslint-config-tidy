'use strict';

module.exports = {
    extends : 'xo',
    rules : {
        // Possible Errors

        'no-cond-assign' : ['error', 'always'],
        'no-empty' : ['error', {
            allowEmptyCatch : false
        }],
        'valid-jsdoc' : ['error'],

        // Best Practices

        complexity : ['error', 16],
        'consistent-return' : ['warn'],
        'no-empty-function' : ['error'],
        'no-invalid-this' : ['error'],
        'no-param-reassign' : ['error'],
        'wrap-iife' : ['error', 'outside'],

        // Strict Mode

        // 'strict' : ['error'],

        // Variables

        'no-shadow' : ['error', {
            builtinGlobals : true,
            hoist : 'functions',
            allow : ['resolve', 'reject', 'err']
        }],
        'no-undefined' : ['error'],
        'no-use-before-define' : ['error', {
            functions : true,
            classes   : true
        }],

        // Node.js and CommonJS

        'callback-return' : ['error'],
        'global-require' : ['error'],
        'handle-callback-err' : ['error'],
        'no-process-env' : ['warn'],
        // Relying upon XO for this. See: https://github.com/sindresorhus/eslint-plugin-xo/blob/master/docs/rules/no-process-exit.md
        // 'no-process-exit' : ['error'],
        'no-sync' : ['error'],

        // Stylistic Issues

        'brace-style' : ['error', 'stroustrup'],
        'consistent-this' : ['error'],
        'func-style' : ['error'],
        'id-length' : ['error', {
            min : 2,
            max : 30,
            properties : 'always',
            exceptions : ['$', 'i', 'x', 'y', 'z']
        }],
        'id-match' : ['error', '^[a-zA-Z_$][a-zA-Z\\d]*$'],
        indent : ['error', 4, {
            SwitchCase : 1
        }],
        'key-spacing' : ['error', {
            beforeColon : true,
            afterColon  : true,
            align       : 'colon',
            mode        : 'minimum'
        }],
        'max-depth' : ['error'],
        'max-len' : ['warn', 100],
        'max-lines' : ['error'],
        'max-nested-callbacks' : ['error', 3],
        'max-params' : ['error', 4],
        'max-statements' : ['error', 30],
        // 'newline-per-chained-call' : ['error'],
        'no-bitwise' : ['error'],
        'no-inline-comments' : ['warn'],
        'no-nested-ternary': ['error'],
        'no-plusplus' : ['error'],
        // See: https://github.com/sindresorhus/eslint-config-xo/issues/27
        // 'object-curly-newline' : ['error'],
        'babel/object-curly-spacing' : ['error', 'always'],
        'object-curly-spacing' : ['error', 'always'],
        'object-property-newline' : ['error'],
        'quote-props' : ['error', 'as-needed'],
        // JSDoc can be nice, but is sometimes a burden.
        // 'require-jsdoc' : ['error'],

        // ECMAScript 6

        'arrow-body-style' : ['error', 'always'],
        'babel/arrow-parens' : ['error', 'always'],
        'arrow-parens' : ['error', 'always'],
        'no-confusing-arrow' : ['error'],
        'no-var' : ['error'],
        'object-shorthand' : ['error', 'always'],
        'prefer-arrow-callback' : ['error'],
        'prefer-const' : ['error'],
        'prefer-rest-params' : ['error'],
        'prefer-spread' : ['error']
        // Simple concats with only one "+" don't benefit.
        // 'prefer-template' : ['error'],
        // Need to research whether this conflicts with XO's use of eslint-plugin-import
        // 'sort-imports' : ['error']
    }
};
