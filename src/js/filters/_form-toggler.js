(function (Drupal, once) {
  Drupal.behaviors.form_toggler = {
    attach: function (context, settings) {
      if (document.getElementById('filter-icon-mobile')){
        document.getElementById('filter-icon-mobile').onclick = function () {
          this.classList.toggle("is-actived");
        }; 
      }
    }
  };
})(Drupal, once);
