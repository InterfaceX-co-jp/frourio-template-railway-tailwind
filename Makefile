# https://www.client9.com/self-documenting-makefiles/
help: ## Shows help
	@awk -F ':|##' '/^[^\t].+?:.*?##/ {\
	printf "\033[36m%-30s\033[0m %s\n", $$1, $$NF \
	}' $(MAKEFILE_LIST)

install: ## Install All Directories
	npm i 
	npm i --prefix backend-api 
	npm i --prefix frontend-web

env-setup-local: ## Setup dotenvs
	cp backend-api/.env.example backend-api/.env	
	cp frontend-web/.env.local.example frontend-web/.env.local


.DEFAULT_GOAL=help
.PHONY=help