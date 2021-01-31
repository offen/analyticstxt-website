help:
	@echo "    setup"
	@echo "        Build the development containers and install dependencies."
	@echo "    update"
	@echo "        Install / update dependencies in the development containers."
	@echo "    build"
	@echo "        Build the production assets."

setup: dev-build update

dev-build:
	@docker-compose build

up:
	@docker-compose up

update:
	@echo "Installing / updating dependencies ..."
	@docker-compose run --rm website pip install --user -r requirements.txt
	@echo "Successfully built containers and installed dependencies."

KEYBASE_FILE ?= keybase.txt
ROBOTS_FILE ?= robots.txt.staging
SITEURL ?= http://localhost:8000

build:
	@docker build --build-arg siteurl=${SITEURL} -t analyticstxt/website -f build/Dockerfile .
	@rm -rf output && mkdir output
	@docker create --entrypoint=bash -it --name assets analyticstxt/website
	@docker cp assets:/code/website/output/. ./output/
	@docker rm assets

.PHONY: setup build up
