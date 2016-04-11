var CLOSE_IMAGE_PATH = '/images/close.png';
var LOGO_IMAGE_PATH = '/images/logo.png';

// remove duplciates from array
var Utility = {
  removeDuplicates: function(a) {
    var seen = {};
    return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }
}
