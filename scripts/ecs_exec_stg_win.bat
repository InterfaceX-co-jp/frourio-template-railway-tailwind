@echo off
set taskId=

:PARSE_ARGS
if "%1"=="" goto :VALIDATE
if "%1"=="-t" (
    shift
    set "taskId=%2"
    shift
    goto :PARSE_ARGS
)

:VALIDATE
if "%taskId%"=="" (
    echo Usage: -t  ^(required: ECS task id. Not arn. For example: 941f8694308b4adea44cb07ff9e50c30^)
    exit /b 1
)

echo Input: %taskId%

aws ecs execute-command --region ap-northeast-1 --cluster aliveland-live-stg-backend-cluster --task "%taskId%" --container backend --interactive --command "/bin/sh"