# Ember-ambitious-table

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

## Releasing

Github Actions will automatically package the module whenever the package.json version is bumped and version tag is created in the `postversion` script.

**After merging your PR to master:**

```bash
git checkout master
git pull && git push # to ensure local and remote match
npm version <major|minor|patch>
```
