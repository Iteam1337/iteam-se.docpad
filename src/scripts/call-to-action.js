(function () {

  'use strict';

  var callToActionButton = $('.call-to-action-form .btn-success');

  callToActionButton.click(function() {

    var contactInfo = $( "[name*='entry.589797910']" )[0].value;
    var contactMessage = $( "[name*='entry.1147522160']" )[0].value;

    var payload = {
      "username": "Call to action",
      "text": 'Någon har fyllt i kontaktformuläret på iteam.se!\n\n' + contactMessage + '\n' + contactInfo,
      "icon_emoji": ":footprints:"
    };

    $.ajax({
      type: "POST",
      url: 'https://iteamsolutions.slack.com/services/hooks/incoming-webhook?token=knBVNH7fnjAr49RzsIfKOplc',
      data: JSON.stringify(payload),
      success: function(data) {
        // No action.
      },
      error: function(data) {
        // No action.
        // console.log('err', data.responseText);
      },
      dataType: 'json'
    });
  });
})();