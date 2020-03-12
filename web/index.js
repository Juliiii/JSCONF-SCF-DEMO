$(function() {
  var addHatButtonDefaultText = "Generating a Christmas hat";
  var submitting = false;
  $(".addHat-button").on("click", function() {
    var finalImg = $("#finalImg");
    var loadingIcon = $(".loading-icon");
    var addHatButtonText = $(".addHat-button-text");
    var imageBase64 = finalImg.attr("src");
    if (!imageBase64 || submitting) {
      return;
    }

    submitting = true;
    loadingIcon.removeClass("hidden");
    addHatButtonText.text("Loading...");

    var showError = function(code) {
      var errorText = code;

      $.toast({
        loader: false,
        allowToastClose: false,
        position: "mid-center",
        heading: "Opps",
        text: errorText
      });
    };

    $.ajax({
      url: window.env.apiUrl[0].url,

      type: "POST",
      data: {
        image: imageBase64.replace("data:image/jpeg;base64,", "")
      },
      dataType: "json",
      success: function(result) {
        var _result = result.body ? JSON.parse(result.body) : result;

        if (_result.code) {
          showError(JSON.parse(_result.message).Code || _result.message);
          return;
        }
        finalImg.prop("src", "data:image/jpeg;base64," + _result.image);
      },
      error: function(err) {
        showError(err.message || JSON.stringify(err));
      },
      complete: function() {
        submitting = false;
        loadingIcon.addClass("hidden");
        addHatButtonText.text(addHatButtonDefaultText);
      }
    });
  });

  $(".image").on("click", function() {
    if (submitting) return;
    $(".image-upload-input").click();
  });

  $(".image-upload-input").on("change", function(event) {
    var file;
    if (event.target.files && event.target.files.length) {
      file = event.target.files[0];

      var ACCEPT_IMAGE_TYPES = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/bmp"
      ];

      if (ACCEPT_IMAGE_TYPES.indexOf(file.type) === -1) {
        $.toast({
          loader: false,
          allowToastClose: false,
          position: "mid-center",
          text: "only support png, jpeg, jpg and bmp"
        });
        return;
      }

      lrz(file).then(function(compressResult) {
        var file = compressResult.file;
        var done = function(url) {
          $(".tailoring-container").toggle();

          $("#tailoringImg").cropper("replace", url, false); //默认false，适应高度，不失真
        };
        if (URL) {
          done(URL.createObjectURL(file));
        } else if (FileReader) {
          var reader = new FileReader();
          reader.onload = function(e) {
            done(reader.result);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  });
  //cropper图片裁剪
  $("#tailoringImg").cropper({
    aspectRatio: 1 / 1,
    guides: false,
    autoCropArea: 1,
    movable: false,
    dragCrop: true,
    movable: true,
    resizable: true,
    zoomable: true,
    zoomOnTouch: true,
    mouseWheelZoom: false,
    touchDragZoom: true,
    rotatable: true,
    background: false,
    crop: function(e) {}
  });

  $("#cancel-button").on("click", function() {
    $(".tailoring-container").toggle();
  });

  $("#sure-button").on("click", function() {
    var canvas = $("#tailoringImg").cropper("getCroppedCanvas");
    var base64url = canvas.toDataURL("image/jpeg");
    $("#finalImg").prop("src", base64url);
    $(".image-upload-icon").hide();
    $(".tailoring-container").toggle();
  });
});
