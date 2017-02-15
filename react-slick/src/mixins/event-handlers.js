'use strict';

import assign from 'object-assign';
import ReactDOM from 'react-dom';

var EventHandlers = {

  onInnerSliderEnter: function(e) {
    console.log('22222222222222222-EventHandlers-onInnerSliderEnter');
  },

  onInnerSliderOver: function(e) {
    console.log('22222222222222222-EventHandlers-onInnerSliderOver');

  },

  onInnerSliderLeave: function(e) {
    console.log('22222222222222222-EventHandlers-onInnerSliderLeave');

  }
};

export default EventHandlers;