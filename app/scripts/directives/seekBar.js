(function() {
  function seekBar($document) {

    /**
    * @function calculatePercent
    * @desc Calculates horizontal percent along seek bar where event occured
    * @returns {number}
    */
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, element, attributes) {
        // directive logic to return
        scope.value = 20;
        scope.max = 100;

        /**
        * @desc Holds the element that matches directive as a jQuery
        * @type {Object}
        */
        var seekBar = $(element);

        /**
        * @function percentString
        * @desc Returns percent that bar must be filled
        * @returns {Number}
        */
        var percentString = function () {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        /**
        * @function fillStyle method
        * @desc Returns width of seek bar fill element
        * @returns {function}
        */
        scope.fillStyle = function() {
          return {width: percentString()};
        };



        /**
        * @function thumbStyle method
        * @desc Updates position of seek bar thumbStyle
        * @returns {function}
        */
        scope.thumbStyle = function() {
            return { left: percentString() };
        };



        /**
        * @function onClickSeekBar method
        * @desc Updates seek bar value based on seek bar's width and click location
        * @returns {function}
        */
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
        };

        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
            });
          });

          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };

      }//close link
    };//close return

  }//close seekBar

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();
