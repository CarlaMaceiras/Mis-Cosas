import Collapse from 'bootstrap/js/dist/collapse';
import Dropdown from 'bootstrap/js/dist/dropdown';

(function (Drupal, once, Collapse, Dropdown) {
  Drupal.behaviors.custom_menu = {
    attach: function (context, settings) {
      once('custom_menu', document.querySelectorAll('.region-collapsed-menu .navbar-nav.menu'), context).forEach(function (menu) {
        menu.querySelectorAll('.dropdown-link').forEach(function (dropdownLink) {
          dropdownLink.addEventListener('show.bs.dropdown', function () {
            let otherDropdownLinks = [...this.parentNode.parentNode.querySelectorAll('.dropdown-link')];
            otherDropdownLinks = otherDropdownLinks.filter(function (element) {
              return element !== dropdownLink;
            });
            otherDropdownLinks.forEach(function (otherDropdownLink) {
              new Dropdown(otherDropdownLink).hide();
            });
          });
          if (dropdownLink.parentNode.querySelector('span.nav-link.dropdown-toggle')) {
            dropdownLink.parentNode.querySelector('span.nav-link.dropdown-toggle').addEventListener('click', function (e) {
              if (this.parentElement.querySelector('.dropdown-link:not(.show)')) {
                new Dropdown(this.parentElement.querySelector(':scope > .dropdown-link:not(.show)')).show();
              }
            });
          }
        });
      });

      const collapsibleMenu = new Collapse(document.querySelector('#mainNavbar'), { toggle: false });
      once('custom_menu', document.querySelectorAll('.region-primary-menu .navbar-nav.menu .nav-link'), context).forEach(function (shortcut) {
        shortcut.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelectorAll('.region-collapsed-menu .navbar-nav.menu .nav-link').forEach(function (link) {
            link.classList.remove('is-selected');
          });
          const element = document.querySelector('.region-collapsed-menu .navbar-nav.menu [data-nav-link-id="' + this.dataset.navLinkId + '"]');
          if (!element.nextElementSibling) {
            if (element.href && element.href !== '') {
              window.location.href = element.href;
            }
          } else {
            element.classList.add('is-selected');
            new Dropdown(element.nextElementSibling).show();
            element.parentElement.querySelectorAll('.menu-item--active-trail > .dropdown-link').forEach(function (link) {
              new Dropdown(link).show();
            });
            collapsibleMenu.show();
          }
          return false;
        });
      });

      const header = document.getElementsByTagName('body')[0];
      const filter_icon_mobile = document.getElementById('filter-icon-mobile');
      const backtotop = document.getElementById('backtotop');
      const delay = 50;

      window.onscroll = () => {
        const scrollTop = document.documentElement.scrollTop;

        if (scrollTop > delay) {
          header.classList.add('scrolled');
        } else if (scrollTop === 0) {
          header.classList.remove('scrolled');
        }

        if (filter_icon_mobile && backtotop && scrollTop > 100) {
          filter_icon_mobile.classList.add('backtotop-visible');
        } else if (filter_icon_mobile) {
          filter_icon_mobile.classList.remove('backtotop-visible');
        }
      };
    },
  };
})(Drupal, once, Collapse, Dropdown);
