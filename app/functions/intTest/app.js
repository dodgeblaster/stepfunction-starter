const AWS = require('aws-sdk')

exports.lambdaHandler = async (event, context) => {
    /**
     * Setup
     */
    const codepipeline = new AWS.CodePipeline()
    const jobId = event['CodePipeline.job'].id
    const putJobSuccess = async (message) => {
        const params = {
            jobId: jobId
        }
        await codepipeline.putJobSuccessResult(params).promise()
        return message
    }

    const putJobFailure = async (message) => {
        const params = {
            jobId: jobId,
            failureDetails: {
                message: JSON.stringify(message),
                type: 'JobFailed',
                externalExecutionId: context.awsRequestId
            }
        }
        await codepipeline.putJobFailureResult(params)
        return message
    }

    /**
     * Test
     */
    try {
        // Tests go here...

        return await putJobSuccess('Tests passed.')
    } catch (e) {
        return await putJobFailure(e)
    }
}
