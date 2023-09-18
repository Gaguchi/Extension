jQuery.noConflict();


(function ($) {
  $(function () {

    $('#states_from').select2({
      tags: true,
      data: [],
      tokenSeparators: [','],
      placeholder: "Add your states from tags here",
      /* the next 2 lines make sure the user can click away after typing and not lose the new tag */
      selectOnClose: true,
      closeOnSelect: true
    });
    $('#states_to').select2({
      tags: true,
      data: [],
      tokenSeparators: [','],
      placeholder: "Add your states to tags here",
      /* the next 2 lines make sure the user can click away after typing and not lose the new tag */
      selectOnClose: true,
      closeOnSelect: true
    });
    $('#zip_from').select2({
      tags: true,
      data: [],
      tokenSeparators: [','],
      placeholder: "Add your states to tags here",
      /* the next 2 lines make sure the user can click away after typing and not lose the new tag */
      selectOnClose: true,
      closeOnSelect: true
    });

    $('#zip_to').select2({
      tags: true,
      data: [],
      tokenSeparators: [','],
      placeholder: "Add your states to tags here",
      /* the next 2 lines make sure the user can click away after typing and not lose the new tag */
      selectOnClose: true,
      closeOnSelect: true
    });

    $('#excluded_ids').select2({
      tags: true,
      data: [],
      tokenSeparators: [','],
      placeholder: "Add load ids to exclude here",
      /* the next 2 lines make sure the user can click away after typing and not lose the new tag */
      selectOnClose: true,
      closeOnSelect: true
    });

    // On tab active, fetch the settings again
    fetchSettings();
    $("#main-nav a:first").on("click", () => {
      fetchSettings();
    });

    function fetchSettings() {
      chrome.storage.sync.get(function (e) {
        $.each(e, function (key, value) {
          if (key == 'refresh_time') {

            $('#homerefresh').html(value);

          } else if (key == 'states_from') {
            var codes = "";
            $('#states_from').select2({
              tags: true,
              data: value,
              tokenSeparators: [','],
              placeholder: "Add your states from tags here",
              /* the next 2 lines make sure the user can click away after typing and not lose the new tag */
              selectOnClose: true,
              closeOnSelect: true
            });

            if (value == null) {
              var codes = "0";
            } else {

              for (var i = 0; i < value.length; i++) {
                codes += value[i] + ",";


              }
              $('#states_from').val(value).trigger('change');
              $('#states_from_home').html(codes);

            }


          } else if (key == 'states_to') {
            var codes = "";
            $('#states_to').select2({
              tags: true,
              data: value,
              tokenSeparators: [','],
              placeholder: "Add your states to tags here",
              /* the next 2 lines make sure the user can click away after typing and not lose the new tag */
              selectOnClose: true,
              closeOnSelect: true
            });

            if (value == null) {
              var codes = "0";
            } else {
              for (var i = 0; i < value.length; i++) {
                codes += value[i] + ",";

              }
              $('#states_to').val(value).trigger('change');
              $('#states_to_home').html(codes);
            }

          } else if (key == 'zip_from') {
            var codes = "";
            $('#zip_from').select2({
              tags: true,
              data: value,
              tokenSeparators: [','],
              placeholder: "Add your states to tags here",
              /* the next 2 lines make sure the user can click away after typing and not lose the new tag */
              selectOnClose: true,
              closeOnSelect: true
            });
            if (value == null) {
              var codes = "0";
            } else {
              for (var i = 0; i < value.length; i++) {
                codes += value[i] + ",";

              }
              $('#zip_from').val(value).trigger('change');

              $('#zip_from_home').html(codes);
            }


          } else if (key == 'zip_to') {
            var codes = "";
            var elt = $('#zip_to');
            $('#zip_to').select2({
              tags: true,
              data: value,
              tokenSeparators: [','],
              placeholder: "Add your states to tags here",
              /* the next 2 lines make sure the user can click away after typing and not lose the new tag */
              selectOnClose: true,
              closeOnSelect: true
            });
            if (value == null) {
              var codes = "0";
            } else {
              for (var i = 0; i < value.length; i++) {
                codes += value[i] + ",";

              }

              $('#zip_to').val(value).trigger('change');

              $('#zip_to_home').html(codes);
            }


          } else if (key == 'stage_limit') {

            $('#stage_limit').val(value);

          } else if (key == 'excluded_ids') {
            var codes = "";
            $('#excluded_ids').select2({
              tags: true,
              data: value,
              tokenSeparators: [','],
              placeholder: "Add your states to tags here",
              /* the next 2 lines make sure the user can click away after typing and not lose the new tag */
              selectOnClose: true,
              closeOnSelect: true
            });
            if (value == null) {
              var codes = "0";
            } else {
              for (var i = 0; i < value.length; i++) {
                codes += value[i] + ",";
              }
              $('#excluded_ids').val(value).trigger('change');
              $('#excluded_ids_home').html(codes);
            }
          }
        });
      });
    }
  });
})(jQuery);
