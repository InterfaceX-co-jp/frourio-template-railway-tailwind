param (
  [Parameter(Mandatory = $true)]
  [string]$t
)

function Print-Usage {
  Write-Host "Usage: -t <ECS task id> (required: ECS task id. Not arn. For example: 941f8694308b4adea44cb07ff9e50c30)"
}

if (-not $PSBoundParameters.ContainsKey('t')) {
    Print-Usage
    exit 1
}

Write-Host "Input: $t"

aws ecs execute-command --region ap-northeast-1 --cluster aliveland-live-stg-backend-cluster --task $t --container backend --interactive --command "/bin/sh"