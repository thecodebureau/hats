# hats

Hats for Epiphany & Ridge.

## Specification

A hat should contain (at least one of) the following

1. An Epiphany module that exports a plain object containing namespaced models and middleware, and an array]
	of routes and pages. This should be reached with `require('hats/name')`.
2. A 'public' Ridge module, to be used in the public part of a web-app. The package.json should tell browserify or similar
	what to return. Thus, this should also be reached with `require('hats/name')`.
3. A 'admin' Ridge module. This should be requried by `require('hats/name/admin`. To achieve this, either place an `admin.js` file
	in the root of the project, or create a directory `admin` with a file `index.js`.
4. Dust templates, located at `/templates`.
