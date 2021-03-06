const post = require('../../utils/rest').post,
    joinParts = require('../../utils/join-keys'),
    ProcessInstance = require('../../shared/types/ProcessInstance')

module.exports = exec

/**
 * Deletes a BPD instance
 *
 * @param {string} instanceId
 * @returns undefined
 */
async function exec(instanceId) {
    if (!instanceId) {
        throw new Error('Instance ID must be provided')
    }

    const result = await post(`/process/${instanceId}?action=delete`, {
        params: {
            parts: 'none'
        }
    })
    
    if (!result || !result.data) {
        throw new Error('No data received from deleting instance')
    }
}
