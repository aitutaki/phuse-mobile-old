APP.controllers.select = (function() {
    var _run = false;

    function _init(cb) {
        if (!_run) {
            $("#select_list").on("click", "li", function() {
                var pwd = prompt("Please enter the album password");

                if (pwd != "") {
                    APP.albumID = $(this).attr("data-idx");
                    APP.albumPwd = pwd;
                    APP.controllers.photo.init();
                }
            });
            _run = true;
        }

        navigator.geolocation.getCurrentPosition(function(position) {
            if (position && position.coords)
            {
              _getAlbums(position.coords.latitude, position.coords.longitude);
            }
            else {
              APP.alert("Unable to retrieve current location. Please try again later.");
            }
          },
          function(error) {
            APP.alert("Unable to retrieve current location. Please try again later.\n" + error.message);
          }
        );

        cb && cb();
    }

    function _getAlbums(lat, long) {
      APP.api("GET", "Albums?lat=" + lat + "&lng=" + long, null, function(data, status, xhr) {
          /*
          <li>
              <span class="icon icon-image"></span>
              <span class="text">Dummy Album</span>
          </li>
          */
          var $ul = $("#select_list").empty();
          $ul.addClass("buttonlist");
          for (var i=0; i < data.length; i++)
          {
              var $li = $("<li></li>");
              $li.attr("data-idx", data[i].AlbumID);
              var $icon = $("<span></span>");
              var $text = $("<span></span>");
              var $sub = $("<span></span>");

              $icon.addClass("icon");
              $icon.addClass("icon-image");

              $text.addClass("text");
              $text.text(data[i].AlbumID + " : " + data[i].AlbumName);

              $sub.addClass("sub");
              $sub.text(data[i].DistanceInMetres + "m away");

              $li.append($icon);
              $li.append($text);
              $li.append($sub);
              $ul.append($li);
          }
      });
    }

    function _back() {
      APP.navigate("home");
    }

    return {
        init: _init,
        back: _back
    };
})();
