'use strict';

module.exports.getConfig = {

  /**
  * @description Creates a Config file
  * @param  {string} token - Token of the bot
  * @param  {string} activity - Activity of the bot
  * @param  {string} status - Status of the bot
  * @param  {string} prefix - Prefix of the bot
  * @param  {string} owner - Owner ID of the bot
  * @param  {boolean} mentionPrefix - Weather MentionPrefix should be enabled or not
  * @returns {Function}
  */
  function(token, activity, status, prefix, owner, mentionPrefix) {
    return `
        module.exports = {
                token: '${token}',
                prefix: '${prefix}',
                status: '${status}',
                activity: '${activity}',
                owner: '${owner}',
                mentionPrefix: \`${mentionPrefix}\`,
                
                
        }
        `;
  },
}
;
