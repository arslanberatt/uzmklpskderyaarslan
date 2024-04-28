$(document).ready(function() {
    // Her bir modalı kapatma işlemi
    $('.close').click(function() {
      $(this).parent().parent().hide();
    });
  
    // Her bir buton için modalı açma işlemi
    $('.openModalBtn').click(function() {
      var modalId = $(this).data('modal');
      $(modalId).show();
    });
  
    // Modal dışına tıklanınca modalı kapatma işlemi
    $('.modal').click(function(event) {
      if ($(event.target).closest('.modal-content').length === 0) {
        $(this).hide();
      }
    });
  });
  
