# qHint - Integrating jsHint into qUnit

This small script lets you integrate jsHint coding style validation into your qUnit unit tests. For more information, see the blog post [Enforcing coding conventions with jsHint and qUnit](http://blog.gyoshev.net/2011/04/enforcing-coding-conventions-with-jshint-and-qunit)

![JsHint in a QUnit suite](http://blog.gyoshev.net/wp-content/uploads/2011/04/jshint-and-qunit.png)

## Usage

1. Include the `qhint.js` file after qUnit and before calling it.

2. Call the `jsHintTest` function like this:

    `jsHintTest(*file* [, *options*, [*globals*]]);`

   Optionally, you can name the test:

    `jsHintTest(*name*, *file* [, *options*, [*globals*]]);`
 
   You can also use the `qHint()` alias of the same function, depending on your preferences.
