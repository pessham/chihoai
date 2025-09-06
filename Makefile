SHELL := /bin/bash

.PHONY: help build build-all preview dev deploy deploy-vercel deploy-firebase sitemap pages clean

help:
	@echo "Targets:"
	@echo "  build           - Generate article pages"
	@echo "  build-all       - Migrate drafts, build, update pages, sitemap"
	@echo "  preview         - Build all and open index.html"
	@echo "  dev             - Serve ./public at :4003 after full build"
	@echo "  deploy          - Full build then deploy (provider from config/env)"
	@echo "  deploy-vercel   - Full build then deploy to Vercel"
	@echo "  deploy-firebase - Full build then deploy to Firebase"
	@echo "  sitemap         - Generate sitemap.xml"
	@echo "  pages           - Update index/blog-list cards"
	@echo "  clean           - Remove generated article HTMLs"

build:
	npm run build

build-all:
	npm run build:all

preview:
	npm run preview

dev:
	npm run dev

deploy:
	npm run deploy

deploy-vercel:
	npm run deploy:vercel

deploy-firebase:
	npm run deploy:firebase

sitemap:
	npm run sitemap

pages:
	npm run pages

clean:
	npm run clean

