function jsHintTest(name, sourceFile, options) {
    function validateFile(source) {
        var i, len, err,
            result = JSHINT(source, options);

        ok(result);

        if (result) {
            return;
        }

        for (i = 0, len = JSHINT.errors.length; i < len; i++) {
            err = JSHINT.errors[i];
            if (!err) {
                continue;
            }

            ok(false, err.reason
                + " on line " + err.line
                + ", character " + err.character);
        }
    }

    return asyncTest(name, function() {	
        $.ajax({
            url: sourceFile,
            success: function(source) {
                start();
                validateFile(source);
            }
        });
    });
}
