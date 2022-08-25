function showLoading(){ 
  //元素出現過的話就不要再重複出現
  if ($('#spinner').length == 1 && $('#loadingMask').length == 1) {
    $('.loading').show();
   
  }
  else {
    
    $('body').prepend('<div id="spinner" class="spinner-border loading role="status""><span class="sr-only"></span></div>' +
      '<div id="loadingMask" class="loading-mask loading"></div>');

    $('.spinner-border').css('position', 'fixed');
    $('.spinner-border').css('top', '50%');
    $('.spinner-border').css('left', '50%');
    $('.spinner-border').css('color', 'white');
    $('.spinner-border').css('z-index', '101');
    $('.loading-mask').css('position', 'fixed');
    $('.loading-mask').css('width', '100%');
    $('.loading-mask').css('height', '100%');
    $('.loading-mask').css('background-color', 'rgb(149, 149, 149)');
    $('.loading-mask').css('z-index', '100');
    $('.loading-mask').css('opacity', '0.8');
    $('.loading').css('display', 'none');
    $('.loading').show();
  }
}

function hideLoading(){
  $('.loading').hide();
}


 