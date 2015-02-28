APP.controllers.login = (function() {
    var _run = false;

    function _init(cb) {
        if (!_run) {
            $("#login_btnOK").click(_login);
            _run = true;
        }
        cb && cb();
    }

    function _login() {
        var un = $("#login_username").val();
        var pwd = $("#login_password").val();
        var creds = {
            Username: un,
            Password: pwd
        };

        APP.api("POST", "Account/Login", creds, function(data, status, xhr) {
            //alert("Logged in OK : " + status);
            if (data == "true")
            {
                window.localStorage.setItem("creds", JSON.stringify(creds));
                APP.userId = creds.Username;
                APP.alert("Logged in OK");
                APP.navigate(APP.path);
            }
            else
            {
                APP.alert("Log in failed. " + xhr.status);
            }
        });
    }

    function _back() {
      APP.navigate("loginreg");
    }

    return {
        init: _init,
        back: _back
    };
})();
