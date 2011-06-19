function f(foo) {
    var i = -1
    var str
    a = 4;

    eval("a = 5");

    a["toString"]();

    for (i = 0; i < 4; i++) {
        debugger;
        str += i;
    }
}
