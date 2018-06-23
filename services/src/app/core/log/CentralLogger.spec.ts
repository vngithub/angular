import { CentralLogger } from '../log/CentralLogger';
describe('CentralLogger Test', () => {
    it('CentralLogger', () => {
        let logger: CentralLogger = new CentralLogger();
        var spiedFunction = spyOn(logger, 'logMessage').and.callThrough();
        logger.info('test', ['A', 'B']);
        logger.debug('test', ['A', 'B']);
        logger.warn('test', ['A', 'B']);
        expect(spiedFunction).toHaveBeenCalledTimes(3);
    });

})