#qHint - Integrating jsHint into qUnit

This small script lets you integrate jsHint coding style validation into your qUnit unit tests. For more information, see the blog post [Enforcing coding conventions with jsHint and qUnit](http://blog.gyoshev.net/2011/04/enforcing-coding-conventions-with-jshint-and-qunit)

##Usage

1. Include the `qhint.js` file after qUnit and before calling it.

2. Call the `jsHintTest` function like this:

    `jsHintTest(*file* [, *options*]);`

   Optionally, you can name the test:

    `jsHintTest(*name*, *file* [, *options*]);`
 
