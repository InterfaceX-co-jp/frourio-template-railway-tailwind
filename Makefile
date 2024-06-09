# https://www.client9.com/self-documenting-makefiles/
help: ## Shows help
	@awk -F ':|##' '/^[^\t].+?:.*?##/ {\
	printf "\033[36m%-30s\033[0m %s\n", $$1, $$NF \
	}' $(MAKEFILE_LIST)

install: ## Install All Directories
	npm i 
	npm i --prefix nftfun-monorepo-backend 
	npm i --prefix nftfun-monorepo-frontend

env-setup-local: ## Setup dotenvs
	cp nftfun-monorepo-backend/.env.example nftfun-monorepo-backend/.env	
	cp nftfun-monorepo-frontend/.env.local.example nftfun-monorepo-frontend/.env.local


.DEFAULT_GOAL=help
.PHONY=help