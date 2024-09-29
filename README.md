## Root Commands

```bash
# At root dir
cd frourio-template-railway-tailwind
```

Setup .env

```bash
# With makefile
make env-setup-local
```

Run the app

```bash
# Let's run DB containers to begin with
docker-compose up -d

# Run npm install for all the directories
make install

# Run dev server for both frontend & backend
npm run dev
```

## Enter ECS tasks in the Staging environment via SSM Session Manager

### What you need

- AWS CLI
- [AWS SSM Plugin](https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/session-manager-working-with-install-plugin. html)

### Reference.

- [SSH connection to ECS Fargate using SSM (Qiita)](https://qiita.com/kouji0705/items/005ea6d7c21ddd24ebb3)

```bash
$ cd frourio-template-railway-tailwind
$ sh . /scripts/ecs_exec_stg -t ((task-id)) # Example) . /scripts/ecs_exec_stg -t 941f8694308b4adea44cb07ff9e50c30
```
