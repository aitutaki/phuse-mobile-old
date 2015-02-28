APP.controllers.register = (function() {
    var _run = false;

    function _init(cb) {
        if (!_run) {
            $("#register_btnOK").click(_register);
            _run = true;
        }
        cb && cb();
    }

    function _register() {
        var un = $("#register_username").val();
        var pwd = $("#register_password").val();
        var pwd2 = $("#register_password2").val();
        var eml = $("#register_email").val();

        if (pwd != pwd2) {
            APP.alert("Passwords must match!");
            return false;
        }

        var creds = {
            UserName: un,
            Password: pwd,
            EmailAddress: eml
        };

        APP.api("POST", "Account/Register", creds, function(data, status, xhr) {
            if (xhr.status == 200)
            {
                window.localStorage.setItem("creds", JSON.stringify(creds));
                APP.userId = creds.UserName;
                APP.alert("Registered && Logged in OK");
                APP.navigate(APP.path);
            }
            else
            {
                APP.alert("Registration failed.");
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
