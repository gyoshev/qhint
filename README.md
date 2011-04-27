#Integrating jsHint into qUnit

This is a demo how to integrate jsHint coding style validation into qUnit unit tests. For more information, see the blog post [Enforcing coding conventions with jsHint and qUnit](http://blog.gyoshev.net/2011/04/enforcing-coding-conventions-with-jshint-and-qunit)

##Usage

1. Include the `jshinttest.js` file after qUnit and before calling it.

2. Call the `jsHintTest` function like this:

    jsHintTest(*name*, *file* [, *options*]);
 
