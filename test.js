import path from 'path';
import test from 'ava';
import isPlainObj from 'is-plain-obj';
import eslint from 'eslint';
import tidy from '.';

const getRules = (errors) => {
    const ruleIds = errors.map((error) => {
        return error.ruleId;
    });
    return [...new Set(ruleIds)];
};

const lint = (input) => {
    const linter = new eslint.CLIEngine({
        useEslintrc : false,
        configFile  : path.join(__dirname, 'index.js')
    });

    return linter.executeOnText(input).results[0].messages;
};

test('config is valid', (t) => {
    t.true(isPlainObj(tidy));
    t.true(Array.isArray(tidy.extends));
    t.true(tidy.extends.length > 1);
    t.true(isPlainObj(tidy.rules));
    t.true(Object.keys(tidy.rules).length > 50);
});

test('no errors for good code', (t) => {
    const errors = lint('\'use strict\';\nconsole.log(\'unicorn\');\n');
    t.deepEqual(errors, []);
});

test('requires single quotes and semicolons', (t) => {
    const errors = lint('\'use strict\';\nconsole.log("unicorn")\n');
    t.deepEqual(getRules(errors), [
        'quotes',
        'semi'
    ]);
});

test('allows one-line object literal with no properties', (t) => {
    const errors = lint('console.log({});\n');
    t.deepEqual(errors, []);
});

test('allows one-line object literal with one property', (t) => {
    const errors = lint('console.log({ one : 1 });\n');
    t.deepEqual(errors, []);
});

test('allows multi-line object literal with one property', (t) => {
    const errors = lint('console.log({\n    one : 1\n});\n');
    t.deepEqual(errors, []);
});

test('disallows one-line object literal with two or more properties', (t) => {
    const errors = lint('console.log({ one : 1, two : 2 });\n');
    t.deepEqual(getRules(errors), [
        'object-curly-newline',
        'object-property-newline'
    ]);
});

test('allows multi-line object literal with two or more properties', (t) => {
    const errors = lint('console.log({\n    one : 1,\n    two : 2\n});\n');
    t.deepEqual(errors, []);
});

test('allows one-line object destructuring with three or fewer properties', (t) => {
    const errors = lint('const { foo, bar, baz } = console;\nfoo(bar, baz);\n');
    t.deepEqual(errors, []);
});

test('allows multi-line object destructuring with three or fewer properties', (t) => {
    const errors = lint('const {\n    foo,\n    bar,\n    baz\n} = console;\nfoo(bar, baz);\n');
    t.deepEqual(errors, []);
});

test('disallows one-line object destructuring with four or more properties', (t) => {
    const errors = lint('const { foo, bar, baz, blah } = console;\nfoo(bar, baz, blah);\n');
    t.deepEqual(getRules(errors), [
        'object-curly-newline'
    ]);
});

test('allows multi-line object destructuring with four or more properties', (t) => {
    const errors = lint('const {\n    foo,\n    bar,\n    baz,\n    blah\n} = console;\nfoo(bar, baz, blah);\n');
    t.deepEqual(errors, []);
});
