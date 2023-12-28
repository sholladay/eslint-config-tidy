import test from 'ava';
import isPlainObj from 'is-plain-obj';
import { ESLint } from 'eslint';
import tidy from './index.js';

const getRules = (errors) => {
    const ruleIds = errors.map((error) => {
        return error.ruleId;
    });
    return [...new Set(ruleIds)];
};

const lint = async (input) => {
    const linter = new ESLint({
        useEslintrc    : false,
        overrideConfig : tidy
    });

    const [result] = await linter.lintText(input);
    return result.messages;
};

test('config is valid', (t) => {
    t.true(isPlainObj(tidy));
    t.true(Array.isArray(tidy.extends));
    t.true(tidy.extends.length > 1);
    t.true(isPlainObj(tidy.rules));
    t.true(Object.keys(tidy.rules).length > 50);
});

test('requires semicolons', async (t) => {
    const bad = 'console.log(\'hello\')\n';
    const good = 'console.log(\'hello\');\n';
    t.deepEqual(getRules(await lint(bad)), ['semi']);
    t.deepEqual(await lint(good), []);
});

test('requires single quotes', async (t) => {
    const bad = 'console.log("hello");\n';
    const good = 'console.log(\'hello\');\n';
    t.deepEqual(getRules(await lint(bad)), ['quotes']);
    t.deepEqual(await lint(good), []);
});

test('allows one-line object literal with no properties', async (t) => {
    const errors = await lint('console.log({});\n');
    t.deepEqual(errors, []);
});

test('allows one-line object literal with one property', async (t) => {
    const errors = await lint('console.log({ one : 1 });\n');
    t.deepEqual(errors, []);
});

test('allows multi-line object literal with one property', async (t) => {
    const errors = await lint('console.log({\n    one : 1\n});\n');
    t.deepEqual(errors, []);
});

test('disallows one-line object literal with two or more properties', async (t) => {
    const errors = await lint('console.log({ one : 1, two : 2 });\n');
    t.deepEqual(getRules(errors), [
        'object-curly-newline',
        'object-property-newline'
    ]);
});

test('allows multi-line object literal with two or more properties', async (t) => {
    const errors = await lint('console.log({\n    one : 1,\n    two : 2\n});\n');
    t.deepEqual(errors, []);
});

test('allows one-line object destructuring with three or fewer properties', async (t) => {
    const errors = await lint('const { foo, bar, baz } = console;\nfoo(bar, baz);\n');
    t.deepEqual(errors, []);
});

test('allows multi-line object destructuring with three or fewer properties', async (t) => {
    const errors = await lint('const {\n    foo,\n    bar,\n    baz\n} = console;\nfoo(bar, baz);\n');
    t.deepEqual(errors, []);
});

test('disallows one-line object destructuring with four or more properties', async (t) => {
    const errors = await lint('const { foo, bar, baz, blah } = console;\nfoo(bar, baz, blah);\n');
    t.deepEqual(getRules(errors), [
        'object-curly-newline'
    ]);
});

test('allows multi-line object destructuring with four or more properties', async (t) => {
    const errors = await lint('const {\n    foo,\n    bar,\n    baz,\n    blah\n} = console;\nfoo(bar, baz, blah);\n');
    t.deepEqual(errors, []);
});

test('disallows multiple spaces after colon in object literal', async (t) => {
    const errors = await lint('console.log({ bar :  \'baz\' });\n');
    t.deepEqual(getRules(errors), ['key-spacing']);
});

test('requires operators next to linebreaks to be at the end of the line', async (t) => {
    const bad = 'const foo = \'sand\'\n    + \'which\';\nconsole.log(foo);\n';
    const good = 'const foo = \'sand\' +\n    \'which\';\nconsole.log(foo);\n';
    t.deepEqual(getRules(await lint(bad)), ['operator-linebreak']);
    t.deepEqual(await lint(good), []);
});
