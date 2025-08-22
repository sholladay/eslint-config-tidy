import xoConfig from 'eslint-config-xo';

const [jsConfig, ...otherConfigs] = xoConfig;

const configs = [
    {
        ...jsConfig,
        rules : {
            ...jsConfig.rules,

            // Possible Errors

            'no-cond-assign' : ['error', 'always'],
            'no-empty'       : ['error', {
                allowEmptyCatch : false
            }],
            // Disabled for now to help move to ESLint 9 flat config. Replace with plugin if needed.
            // 'valid-jsdoc' : 'error',

            // Best Practices

            complexity                   : ['error', 16],
            'consistent-return'          : 'warn',
            'no-empty-function'          : 'error',
            'no-invalid-this'            : 'error',
            'no-param-reassign'          : 'error',
            'no-useless-catch'           : 'error',
            'prefer-named-capture-group' : 'error',
            'require-unicode-regexp'     : 'error',

            // Variables

            'no-shadow' : ['error', {
                builtinGlobals : true,
                hoist          : 'functions',
                allow          : ['resolve', 'reject', 'err']
            }],
            'no-undefined'         : 'error',
            'no-use-before-define' : 'error',

            // Node.js and CommonJS

            'callback-return'     : 'error',
            'global-require'      : 'error',
            'handle-callback-err' : 'error',
            'no-process-env'      : 'warn',
            'no-sync'             : 'error',

            // Stylistic Issues

            '@stylistic/arrow-parens'           : ['error', 'always'],
            '@stylistic/brace-style'            : ['error', 'stroustrup'],
            '@stylistic/comma-dangle'           : ['error', 'never'],
            '@stylistic/function-paren-newline' : ['error', 'consistent'],
            '@stylistic/indent'                 : ['error', 4, {
                SwitchCase : 1
            }],
            '@stylistic/indent-binary-ops' : ['error', 4],
            '@stylistic/jsx-quotes'        : ['error', 'prefer-double'],
            '@stylistic/key-spacing'       : ['error', {
                beforeColon : true,
                afterColon  : true,
                align       : 'colon',
                mode        : 'strict'
            }],
            '@stylistic/linebreak-style'             : ['error', 'unix'],
            '@stylistic/lines-between-class-members' : ['error', 'never'],
            '@stylistic/max-len'                     : ['warn', {
                code          : 100,
                ignoreStrings : true
            }],
            '@stylistic/no-confusing-arrow'   : 'error',
            '@stylistic/object-curly-newline' : ['error', {
                ObjectExpression : {
                    multiline     : true,
                    minProperties : 2,
                    consistent    : true
                },
                ObjectPattern : {
                    multiline     : true,
                    minProperties : 4,
                    consistent    : true
                },
                ImportDeclaration : {
                    multiline     : true,
                    minProperties : 4,
                    consistent    : true
                },
                ExportDeclaration : {
                    multiline     : true,
                    minProperties : 2,
                    consistent    : true
                }
            }],
            '@stylistic/object-curly-spacing'            : ['error', 'always'],
            '@stylistic/object-property-newline'         : 'error',
            // Disabled as sn experiment to see if I prefer XO's use of "before" instead of "after"
            // '@stylistic/operator-linebreak'      : [
            //     'error',
            //     'after',
            // ],
            '@stylistic/padding-line-between-statements' : 'off',
            '@stylistic/quote-props'                     : ['error', 'as-needed'],
            '@stylistic/wrap-iife'                       : ['error', 'outside'],
            'arrow-body-style'                           : ['error', 'always'],
            'consistent-this'                            : 'error',
            'func-style'                                 : 'error',
            'id-length'                                  : ['error', {
                min        : 2,
                max        : 30,
                properties : 'always',
                exceptions : [
                    // Cheerio / jQuery
                    '$',
                    // Toolkit for handlers in hapi
                    'h',
                    // Counter variable
                    'i',
                    // RethinkDB client
                    'r',
                    // AVA test context object
                    't',
                    // Coordinates
                    'x',
                    'y',
                    'z'
                ]
            }],
            'id-match'  : ['error', String.raw`^[a-zA-Z_$][a-zA-Z\d]*$`],
            'max-depth' : 'error',
            'max-lines' : ['error', {
                max : 300
            }],
            'max-nested-callbacks'  : ['error', 3],
            'max-params'            : ['error', 4],
            'max-statements'        : ['error', 30],
            'no-bitwise'            : 'error',
            'no-inline-comments'    : 'warn',
            'no-nested-ternary'     : 'error',
            'no-plusplus'           : 'error',
            'prefer-arrow-callback' : 'error',
            'prefer-const'          : 'error',
            'prefer-object-spread'  : 'error',
            'sort-imports'          : ['error', {
                // We sort by import source, which can conflict with sorting by declaration style
                ignoreDeclarationSort : true
            }]
        }
    },
    ...otherConfigs
];

export default configs;
