const core = require('@actions/core')
const github = require('@actions/github') //uses for communcate with github API
const exec = require('@actions/exec')

function run(){
    //Get some input values
    const bucket = core.getInput('bucket',{required: true})
    const bucketRegion = core.getInput('bucket-region',{required: true})
    const artifcat = core.getInput('dist-folder',{required: false})
    const s3Uri = `s3://${bucket}`
    
    exec.exec(`aws s3 sync ${artifcat} ${s3Uri} --region ${bucketRegion}`)
    core.notice('dist uploaded with sucess');
    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl)
}

run(); 
//Add comment