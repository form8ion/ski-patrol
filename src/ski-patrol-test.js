import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as husky from './husky';
import {patrol} from './ski-patrol';

suite('ski-patrol', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(husky, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the project is checked for issues', async () => {
    const projectRoot = any.string();

    await patrol({projectRoot});

    assert.calledWith(husky.default, projectRoot);
  });
});
