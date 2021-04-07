.PHONY: help
help:
	@echo "    setup"
	@echo "        Build the development containers and install dependencies."
	@echo "    update"
	@echo "        Install / update dependencies in the development containers."
	@echo "    build"
	@echo "        Build the production assets."

setup: dev-build update

dev-build: Dockerfile.python
	@docker-compose build

.PHONY: up
up:
	@docker-compose up

update: website/requirements.txt
	@echo "Installing / updating dependencies ..."
	@docker-compose run --rm website pip install --user -r requirements.txt
	@echo "Successfully built containers and installed dependencies."

SITEURL ?= http://localhost:8000

.PHONY: build
build:
	@docker build --build-arg siteurl=${SITEURL} --build-arg offenaccountid=${OFFEN_ACCOUNT_ID} -t analyticstxt/website -f build/Dockerfile .
	@rm -rf output && mkdir output
	@docker create --entrypoint=bash -it --name assets analyticstxt/website
	@docker cp assets:/code/website/output/. ./output/
	@docker rm assets
