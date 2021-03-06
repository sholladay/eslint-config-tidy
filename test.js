import path from 'path';
import test from 'ava';
import isPlainObj from 'is-plain-obj';
import eslint from 'eslint';
import tidy from './index.js';

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

test('requires semicolons', (t) => {
    const bad = 'console.log(\'hello\')\n';
    const good = 'console.log(\'hello\');\n';
    t.deepEqual(getRules(lint(bad)), ['semi']);
    t.deepEqual(lint(good), []);
});

test('requires single quotes', (t) => {
    const bad = 'console.log("hello");\n';
    const good = 'console.log(\'hello\');\n';
    t.deepEqual(getRules(lint(bad)), ['quotes']);
    t.deepEqual(lint(good), []);
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

test('disallows multiple spaces after colon in object literal', (t) => {
    const errors = lint('console.log({ bar :  \'baz\' });\n');
    t.deepEqual(getRules(errors), ['key-spacing']);
});
