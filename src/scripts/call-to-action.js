(function () {

  'use strict';

  var callToAction = document.getElementById('call-to-action');

  if (!!callToAction) {
    callToAction.addEventListener('mouseup', function (e) {
      e.target.parentElement.classList.toggle('open');
    });
  }

})();