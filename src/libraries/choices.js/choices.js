(function (Drupal, once) {
  Drupal.behaviors.choicesjs = {
    attach: function (context, settings) {
      once('selects', document.querySelectorAll('.layout-container select'), context).forEach(function (select) {
        new Choices(select, {
          allowHTML: false,
          searchEnabled: false,
          searchChoices: false,
          shouldSort: false,
          noResultsText: Drupal.t('No results found'),
          noChoicesText: Drupal.t('No choices to choose from'),
          itemSelectText: '',
          placeholderValue: Drupal.t('- Select -'),
          searchPlaceholderValue: Drupal.t('- Select -'),
          callbackOnCreateTemplates: function (template) {
            return {
              containerOuter: (...args) => {
                let div = Object.assign(Choices.defaults.templates.containerOuter.call(this, ...args));
                if (select.dataset.ariaLabel) {
                  div.setAttribute('aria-label', select.dataset.ariaLabel);
                }
                return div;
              },
              choiceList: (...args) => {
                let div = Object.assign(Choices.defaults.templates.choiceList.call(this, ...args));
                if (select.dataset.ariaLabel) {
                  div.setAttribute('aria-label', Drupal.t('Options for @label', {'@label': select.dataset.ariaLabel}));
                }
                return div;
              }
            }
          }
        });
      });

      once('choicesjs', document.querySelectorAll('.choices'), context).forEach(function (container) {
        if (container.hasAttribute('role')) {
          container.removeAttribute('role');
        }
      });
    }
  };
})(Drupal, once);
