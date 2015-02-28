APP.controllers.create = (function() {
    var _run = false;

    function _init(cb) {
        if (!_run) {
            $("#create_btnOK").click(_create);
            _run = true;
        }

        $("input", "#create").val("");
        cb && cb();
    }

    function _create() {
        var data = {};

        try {

          if ($("input[value='']").length > 0) {
            APP.alert("You must complete all fields.");
            return true;
          }

          $("#create [data-prop]").each(function() {
              var $this = $(this);
              var prop = $this.attr("data-prop");

              data[prop] = $this.val();
          });

          // "\/Date(1330848000000-0800)\/"
          var $dt = $("#create_date");
          var $tm = $("#create_time");

          //var dt = new Date($dt.val() + " " + $tm.val());
          //var arr = ($dt.val() + " " + $tm.val()).split(/[- :]/);
          //alert(JSON.stringify(arr));
          //var dt = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
          //alert(dt);
          data.ContributeFrom = (new Date()).toJSON(); // dt.toJSON();

          APP.api("POST", "Albums/Post", data, function(data, status, xhr) {
              if (xhr.status == 200)
              {
                  APP.alert("Album created OK.");
                  APP.navigate("home");
              }
              else
              {
                  APP.alert("Album creation failed.");
              }
          });
        }
        catch(e) {
          APP.alert("There was a problem with yoru submission " + e);
        }
    }

    function _back() {
      APP.navigate("home");
    }

    return {
        init: _init,
        back: _back
    };
})();
