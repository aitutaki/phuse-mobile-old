APP = APP || {};
APP.controllers = APP.controllers || {};

APP.controllers.home = (function() {

    var _run = false;
    function _init(cb) {
        if (!_run) {
            // First-time setup
            $("#home_dummy").click(function(e) {
                _reg();
            });

            $("#home_select").click(function(e) {
                if (true || APP.isLoggedIn()) {
                    APP.navigate("select");
                }
                else
                {
                    APP.path = "select";
                    APP.navigate("loginreg");
                }
            });

            $("#home_create").click(function(e) {
                if (APP.isLoggedIn()) {
                    APP.navigate("create");
                }
                else
                {
                    APP.path = "create";
                    APP.navigate("loginreg");
                }
            });
            _run = true;
        }
        if (APP.isLoggedIn()) {
          $("#home_name").text(APP.userId);
          $("#home_msg").show();
        }
        else
        {
          $("#home_msg").hide();
        }
        cb && cb();
    }

    function _reg() {
        var _data = {
          "AlbumName": "TCs 21st",
          "VenueName": "The Royal Albert Hall",
          "VenueAddress": "London",
          "VenueWifiName": "RAH",
          "VenueWifiPassword": "weefee",
          "ContributeFrom": "2014-04-07T20:02:19.3068074+01:00",
          "Password": "p455w0rd"
        };

        function _ok(data, status, xhr) {
            alert("Status: " + status + "\nData: " + JSON.stringify(data));
        }

        function _ok(data, status, xhr) {
            alert("Status: " + status + "\nData: " + JSON.stringify(data));
        }

        $.post("http://www.papmyday.com/api/Albums/Post",
              _data, _ok);
    }

    return {
        init: _init
    };
})();
