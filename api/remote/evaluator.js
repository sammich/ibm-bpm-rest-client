const { cleanUpBpmObject, isBpmError } = require('../../utils/bpm'),
    start = require('../service/start')

module.exports = exec

const EVALUATOR_SERVICE_ID = process.env.EVALUATOR_SERVICE_ID || '1.234cfbc6-4755-4aff-905d-dada28c02a76'

/**
 * Use the 'Remote' Process Application's API to execute a service and return it's output.
 *
 * @param {Function} evalFunc - define the target service
 * @returns {Promise<Object>} - the results of the service called
 * @throws Function must be provided
 */
async function exec(evalFunc) {
    if (!evalFunc || !(evalFunc instanceof Function)) {
        throw new Error('Function must be provided')
    }
    
    try {
        let results = await start(EVALUATOR_SERVICE_ID, {
            apiKey: process.env.REMOTE_EXALUATOR_API_KEY || process.env.REMOTE_API_KEY || 'abc123',
            evalStr: '(' + evalFunc.toString() + ')()'
        })
        
        results = results && results.retVal
    
        return cleanUpBpmObject(results)
    } catch (err) {
        return Promise.reject(isBpmError(err) || err)
    }
}
