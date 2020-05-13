import {promises as fs} from 'fs';
import * as cliMessages from '@travi/cli-messages';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import husky from './husky';

suite('husky', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'readFile');
    sandbox.stub(cliMessages, 'warn');
  });

  teardown(() => sandbox.restore());

  test('that no problem is reported when the legacy hooks are not used', async () => {
    const projectRoot = any.string();
    fs.readFile
      .withArgs(`${projectRoot}/package.json`, 'utf8')
      .resolves(JSON.stringify({scripts: any.simpleObject()}));

    await husky(projectRoot);

    assert.notCalled(cliMessages.warn);
  });

  test('that a warning is provided if a legacy `precommit` hook is defined', async () => {
    const projectRoot = any.string();
    fs.readFile
      .withArgs(`${projectRoot}/package.json`, 'utf8')
      .resolves(JSON.stringify({scripts: {precommit: any.sentence()}}));

    await husky(projectRoot);

    assert.calledWith(cliMessages.warn, '`precommit` npm script found. This approach has been deprecated by `husky`');
    assert.neverCalledWith(
      cliMessages.warn,
      '`commitmsg` npm script found. This approach has been deprecated by `husky`'
    );
  });

  test('that a warning is provided if a legacy `commitmsg` hook is defined', async () => {
    const projectRoot = any.string();
    fs.readFile
      .withArgs(`${projectRoot}/package.json`, 'utf8')
      .resolves(JSON.stringify({scripts: {commitmsg: any.sentence()}}));

    await husky(projectRoot);

    assert.neverCalledWith(
      cliMessages.warn,
      '`precommit` npm script found. This approach has been deprecated by `husky`'
    );
    assert.calledWith(cliMessages.warn, '`commitmsg` npm script found. This approach has been deprecated by `husky`');
  });
});
