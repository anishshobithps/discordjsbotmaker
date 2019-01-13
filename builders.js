module.exports = {
  getconfig: function (token, activity, status, prefix, owner) {
        return `
        module.exports = {
                token: "${token}",
                prefix: "${prefix}",
                status: "${status}",
                activity: "${activity}",
                owner: "${owner}"
                /*
                add more according to your bot :D
                */ 
        }
        `
    }
}