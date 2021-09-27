const AWS = require('aws-sdk')

exports.lambdaHandler = async () => {
    return {
        id: AWS.util.uuid.v4(),
        synth: true,
        payment: JSON.stringify({
            example: true
        })
    }
}
