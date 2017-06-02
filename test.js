import test from 'ava';
import isPlainObj from 'is-plain-obj';
import eslint from 'eslint';
import tempWrite from 'temp-write';
import tidy from '.';

const hasRule = (errors, ruleId) => {
    return errors.some((err) => {
        return err.ruleId === ruleId;
    });
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
    t.true(hasRule(errors, 'quotes'));
    t.true(hasRule(errors, 'semi'));
});
