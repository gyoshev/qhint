var oldAsyncTest = asyncTest;
var oldStart = start;
var fails;
var responseText;
var qHintFail = qHint.fail;
var qHintSuccess = qHint.success;
var qHintFetch = qHint.fetch;

module("Functionality", {
    setup: function() {
        // stub qUnit functions in order to test how they are called

        asyncTest = function(name, f) {
            f();
        };

        start = function() {};

        fails = 0;
        qHint.fail = function() { fails++ };
        qHint.success = function() {};

        responseText = "";
        qHint.fetch = function(url, callback) {
            callback({
                status: 200,
                sourceFile: url,
                responseText: responseText || "var a = 1;"
            });
        };
    },
    teardown: function() {
        // restore QUnit
        asyncTest = oldAsyncTest;
        start = oldStart;

        // restore qHint
        qHint.fetch = qHintFetch;
        qHint.jsHint = JSHINT;
        qHint.fail = qHintFail;
        qHint.success = qHintSuccess;
    }
});

test("calls with one parameter uses it as test name", function(assert) {
    qHint.jsHint = function(f) {
        assert.deepEqual(f, "var a = 1;");
        return true;
    };

    jsHintTest("foo.js");
});

test("passes options to jsHint", function(assert) {
    var options = { eqeqeq: false };

    qHint.jsHint = function(f, o) {
        assert.deepEqual(o, options);
        return true;
    };

    jsHintTest("foo.js", options);
});

test("passes globals to jsHint", function(assert) {
    var globals = { ok: false };

    qHint.jsHint = function(f, o, g) {
        assert.deepEqual(g, globals);
        return true;
    };

    jsHintTest("foo.js", {}, globals);
});

test("fails for one validation error", function(assert) {
    qHint.validateFile("foo = 1;", { undef: true });

    assert.ok(fails, 1);
});

test("fails for each validation error", function(assert) {
    qHint.validateFile("foo = 1; bar = 2;", { undef: true });

    assert.equal(fails, 2, "fails twice");
});

test("reports unused variables when called with `unused`", function(assert) {
    qHint.validateFile("(function () { var foo = 1, bar = 2; bar++; })();", { unused: true });

    equal(fails, 1, "calls ok once");
});

test("reports each unused variable separately", function(assert) {
    qHint.validateFile("(function () { var foo = 1, bar = 2, baz = 3; bar++; })();", { unused: true });

    equal(fails, 2, "calls ok for each variable");
});

test("validation does not change options object", function(assert) {
    var options = { unused: true };

    qHint.validateFile("function a() { var foo = 1, bar = 2, baz = 3; bar++; }", options);

    assert.ok(options.unused);
});


module("Style");

var qHintSrc = document.querySelector("script[src*=qhint]").getAttribute("src");

qHint("qHinting qHint", qHintSrc, {
    curly: true,
    trailing: true,
    latedef: true,
    unused: true,
    browser: true,
    jquery: true
});
