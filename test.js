import test from 'ava';
import isPlainObj from 'is-plain-obj';
import eslint from 'eslint';
import tempWrite from 'temp-write';
import tidy from '.';

const getRules = (errors) => {
    const ruleIds = errors.map((error) => {
        return error.ruleId;
    });
    return [...new Set(ruleIds)];
};

const runEslint = (str, conf) => {
    const linter = new eslint.CLIEngine({
        useEslintrc : false,
        configFile  : tempWrite.sync(JSON.stringify(conf))
    });

    return linter.executeOnText(str).results[0].messages;
};

test('main', (t) => {
    t.true(isPlainObj(tidy));
    t.true(isPlainObj(tidy.rules));

    const errors = runEslint('\'use strict\';\nconsole.log("unicorn")\n', tidy);
    t.deepEqual(getRules(errors), [
        'quotes',
        'semi'
    ]);
});

test('allows one-line object literal with no properties', (t) => {
    const errors = runEslint('console.log({});\n', tidy);
    t.is(errors.length, 0);
});

test('allows one-line object literal with one property', (t) => {
    const errors = runEslint('console.log({ one : 1 });\n', tidy);
    t.is(errors.length, 0);
});

test('allows multi-line object literal with one property', (t) => {
    const errors = runEslint('console.log({\n    one : 1\n});\n', tidy);
    t.is(errors.length, 0);
});

test('disallows one-line object literal with two or more properties', (t) => {
    const errors = runEslint('console.log({ one : 1, two : 2 });\n', tidy);
    t.deepEqual(getRules(errors), [
        'object-curly-newline',
        'object-property-newline'
    ]);
});

test('allows multi-line object literal with two or more properties', (t) => {
    const errors = runEslint('console.log({\n    one : 1,\n    two : 2\n});\n', tidy);
    t.is(errors.length, 0);
});

test('allows one-line object destructuring with three or fewer properties', (t) => {
    const errors = runEslint('const { foo, bar, baz } = console;\nfoo(bar, baz);\n', tidy);
    t.is(errors.length, 0);
});

test('allows multi-line object destructuring with three or fewer properties', (t) => {
    const errors = runEslint('const {\n    foo,\n    bar,\n    baz\n} = console;\nfoo(bar, baz);\n', tidy);
    t.is(errors.length, 0);
});

test('disallows one-line object destructuring with four or more properties', (t) => {
    const errors = runEslint('const { foo, bar, baz, blah } = console;\nfoo(bar, baz, blah);\n', tidy);
    t.deepEqual(getRules(errors), [
        'object-curly-newline'
    ]);
});

test('allows multi-line object destructuring with four or more properties', (t) => {
    const errors = runEslint('const {\n    foo,\n    bar,\n    baz,\n    blah\n} = console;\nfoo(bar, baz, blah);\n', tidy);
    t.is(errors.length, 0);
});
