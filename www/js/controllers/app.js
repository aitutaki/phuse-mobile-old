var APP =
(function() {

    var _currPage,
        $page = null;
    var _history;
    var _isLoggedIn = false;

    var _url = "http://www.papmyday.com/api/";

    window.addEventListener('load', function() {
        new FastClick(document.body);

        var _creds = window.localStorage.getItem("creds");
        _creds = JSON.parse(_creds);
        if (_creds && _creds != "")
        {
            _api("POST", "Account/Login", _creds, function(data, status, xhr) {
                if (data == "true") {
                    APP.userId = _creds.Username;
                    _isLoggedIn = true;
                }
                else
                {
                    window.localStorage.clearItem("creds");
                    _isLoggedIn = false;
                }
                _navigate("home");
            });
        }
        else
        {
          _navigate("home");
        }


        $("#btnBack").click(function() {
          APP.controller && APP.controller.back();
        });
    }, false);

    window.addEventListener("popstate", function(e) {
        //if (!e.state.forward) _back();
    });

    $.ajaxSetup({
        error: _ajaxErr
    });

    function _ajaxErr (xhr, status, error) {
        alert("ERROR" + status + " :: " + error);
    }

    function _navigate(pg, cb) {
        $page && $page.hide();

        var ctrl = APP.controllers[pg];
        APP.controller = ctrl;
        if (!ctrl) throw "Controller " + pg + " not found.";
        ctrl.init(function() {
            $page = $("#" + pg).show();

            if (pg == "home")
            {
              $("#btnBack").hide();
            }
            else
            {
              $("#btnBack").show();
            }

            //history.pushState({forward:true}, null, "#" + pg);
        });
    }

    function _back(cb) {
        //history.back();
        var pg = location.href.replace("#", "");
        $page && $page.hide();
        $page = $("#" + pg).show();
    }

    function _api(meth, fn, obj, cb) {
        $.ajax({
            url: _url + fn,
            method: meth,
            data: obj,
            success: cb
        });
    }

    return {
        navigate: _navigate,
        back: _back,
        controllers: {},
        alert: function(str) { alert(str); },
        api : _api,
        userId: "",
        isLoggedIn: function() { return !!APP.userId; }
    };
})();
