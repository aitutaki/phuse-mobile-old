APP.controllers.loginreg = (function() {
    var _run = false;

    function _init(cb) {
        if (!_run) {
            $("#loginreg_login").click(function(e) {
                APP.navigate("login");
            });

            $("#loginreg_reg").click(function(e) {
                APP.navigate("register");
            });
            _run = true;
        }

        cb && cb();
    }

    function _back() {
      APP.navigate("home");
    }

    return {
        init: _init,
        back: _back
    };
})();
