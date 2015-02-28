APP.controllers.photo = (function() {
    var _run = false;

    function _init(cb) {
        if (!_run) {

            _run = true;
        }

        try {
        /*
            navigator.device.capture.captureImage(
                function(files) {
                    console.log(files);
                    alert(files.length);
                },
                function(err) {
                    alert(err);
                    console.log(err);
                }, {limit: 99});
        */
            navigator.camera.getPicture(
                function(imgData) {
                    // alert(imgData);

                    APP.api("POST", "Photos", {
                      "AlbumId": APP.albumID,
                      "Type": "jpg",
                      "MediaData": imgData,
                      "Location": {
                        "Lat": "0",
                        "Long": "0"
                      },
                      "TakenOn": (new Date()).toJSON()
                    }, function(data, status, xhr) {
                        APP.alert("Photo uploaded OK. " + JSON.stringify(data));
                    });
                },
                function(msg) {
                    alert(msg);
                },
                {
                    quality: 100,
                    targetWidth: 800,
                    targetHeight: 600,
                    destinationType: Camera.DestinationType.DATA_URL,
                    allowEdit: false
                });
        }
        catch(e) {
            alert(e);
        }

        cb && cb();
    }

    function _back() {
      APP.navigate("select");
    }

    return {
        init: _init,
        back: _back
    };

})();
