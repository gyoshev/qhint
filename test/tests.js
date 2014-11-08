var oldAsyncTest = asyncTest,
    oldStart = start,
    oldSendRequest = qHint.sendRequest,
    oldJsHint = JSHINT,
    jsHintArgs, asyncTestArgs,
    responseText;

module("Functionality", {
    setup: function() {
        // stub qUnit functions in order to test how they are called

        jsHintArgs = [];
        asyncTestArgs = [];

        JSHINT = function() {
            jsHintArgs = arguments;

            return true;
        };

        JSHINT.data = function() {
            return {};
        };

        asyncTest = function(name, f) {
            asyncTestArgs = arguments;
            f();
        };

        start = function() {};

        qHint.sendRequest = function(url, callback) {
            callback({
                status: 200,
                sourceFile: url,
                responseText: responseText || "var a = 1;"
            });
        };
    },
    teardown: function() {
        asyncTest = oldAsyncTest;
        start = oldStart;
        JSHINT = oldJsHint;
        qHint.sendRequest = oldSendRequest;
        responseText = "";
    }
});

test("calls with one parameter uses it as test name", function(assert) {
    jsHintTest("foo.js");

    assert.equal(asyncTestArgs[0], "foo.js");
});

test("passes options to jsHint", function(assert) {
    var options = {
            eqeqeq: false
        };

    jsHintTest("foo.js", options);

    assert.deepEqual(jsHintArgs[1], options);
});

test("passes globals to jsHint", function(assert) {
    var globals = {
            ok: false
        };

    jsHintTest("foo.js", {}, globals);

    assert.deepEqual(jsHintArgs[2], globals);
});

test("calls ok(false) for one validation error", function(assert) {
    var oldOk = assert.ok,
        okArgs;

    assert.ok = function() {
        okArgs = arguments;
    };
    JSHINT = oldJsHint;

    qHint.validateFile("foo = 1;", { undef: true });

    assert.ok = oldOk;

    equal(okArgs[0], false);
});

test("calls ok(false) for each validation error", function(assert) {
    var oldOk = assert.ok,
        calls = 0;

    assert.ok = function(status) {
        oldOk(!status, "must report error");
        calls++;
    };

    JSHINT = oldJsHint;

    qHint.validateFile("foo = 1; bar = 2;", { undef: true });

    assert.ok = oldOk;

    equal(calls, 2, "calls ok() twice");
});

test("reports unused variables when called with `unused`", function(assert) {
    var oldOk = assert.ok,
        calls = 0;

    assert.ok = function(status) {
        oldOk(!status, "must report error");
        calls++;
    };

    JSHINT = oldJsHint;

    qHint.validateFile("(function () { var foo = 1, bar = 2; bar++; })();", { unused: true });

    assert.ok = oldOk;

    equal(calls, 1, "calls ok once");
});

test("reports each unused variable separately", function(assert) {
    var oldOk = assert.ok,
        calls = 0;

    assert.ok = function(status) {
        oldOk(!status, "must report error");
        calls++;
    };

    JSHINT = oldJsHint;

    qHint.validateFile("(function () { var foo = 1, bar = 2, baz = 3; bar++; })();", { unused: true });

    assert.ok = oldOk;

    equal(calls, 2, "calls ok for each variable");
});

test("validation does not change options object", function(assert) {
    var oldOk = assert.ok;
    var options = { unused: true };

    assert.ok = function(status) {};
    JSHINT = oldJsHint;

    qHint.validateFile("function a() { var foo = 1, bar = 2, baz = 3; bar++; }", options);

    assert.ok = oldOk;

    assert.ok(options.unused);
});

module("Style");

qHint("qHinting qHint", "../qhint.js", {
    curly: true,
    trailing: true,
    latedef: true,
    unused: true,
    browser: true,
    jquery: true
});

