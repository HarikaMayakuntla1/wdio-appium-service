import assert from 'assert';
import launcher from '../../launcher';

describe('launcher', () => {
    it('should format args properly', () => {
        const args = launcher._keyValueToCliArgs({
            address: '127.0.0.1',
            commandTimeout: '7200',
            showIosLog: false,
            sessionOverride: true
        });

        assert.equal(args[0], '--address');
        assert.equal(args[1], '127.0.0.1');
        assert.equal(args[2], '--command-timeout');
        assert.equal(args[3], '7200');
        assert.equal(args[4], '--session-override');
    });

    it('should format key', () => {
        assert.equal(launcher._lowerCamelToOptionName('address'), '--address');
        assert.equal(launcher._lowerCamelToOptionName('fooBar'), '--foo-bar');
        assert.equal(launcher._lowerCamelToOptionName('fooBarSonDo'), '--foo-bar-son-do');
    });

    describe('platform specific', () => {
        let originalPlatform = '';
        it('should return shell on non win', () => {
            originalPlatform = process.platform;
            Object.defineProperty(process, 'platform', {
                value: 'darwin'
            });
            assert.equal(launcher._getAppiumFileName(), 'appium');
        });
        it('should return cmd on win', () => {
            originalPlatform = process.platform;
            Object.defineProperty(process, 'platform', {
                value: 'win32'
            });
            assert.equal(launcher._getAppiumFileName(), 'appium.cmd');
        });
        after(() => {
            console.log(originalPlatform)
            Object.defineProperty(process, 'platform', {
                value: originalPlatform
            });
        });
    });
});
