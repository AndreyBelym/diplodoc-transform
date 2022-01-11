(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    if (typeof document !== 'undefined') {
      // matches polyfill for old edge
      (function (e) {
        var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;

        if (matches) {
          e.matches = e.matchesSelector = matches;
        } else {
          e.matches = e.matchesSelector = function matches(selector) {
            var matches = document.querySelectorAll(selector);
            var th = this;
            return Array.prototype.some.call(matches, function (e) {
              return e === th;
            });
          };
        }
      })(Element.prototype);
    }

    var isCustom = function isCustom(event) {
      return !event.target || !event.target.matches;
    };

    var Selector$1 = {
      TABS: '.yfm .yfm-tabs',
      TAB_LIST: '.yfm .yfm-tab-list',
      TAB: '.yfm .yfm-tab',
      TAB_PANEL: '.yfm .yfm-tab-panel'
    };
    var ClassName$1 = {
      ACTIVE: 'active'
    };

    function selectTab(element) {
      if (!element.parentNode || !element.parentNode.matches(Selector$1.TAB_LIST) || !element.parentNode.parentNode || !element.parentNode.parentNode.matches(Selector$1.TABS) || element.classList.contains(ClassName$1.ACTIVE)) {
        return;
      }

      var tab = element;
      var tabList = tab.parentNode;
      var tabsContainer = tabList.parentNode;
      var allTabs = Array.from(tabsContainer.querySelectorAll(Selector$1.TAB));
      var allPanels = Array.from(tabsContainer.querySelectorAll(Selector$1.TAB_PANEL));
      var targetIndex = allTabs.indexOf(tab);

      for (var i = 0; i < allTabs.length; i++) {
        var _tab = allTabs[i];
        var panel = allPanels[i];

        if (i === targetIndex) {
          _tab.classList.toggle(ClassName$1.ACTIVE, true);

          _tab.setAttribute('aria-selected', true);

          _tab.setAttribute('tabindex', 0);

          panel.classList.toggle(ClassName$1.ACTIVE, true);
        } else {
          _tab.classList.toggle(ClassName$1.ACTIVE, false);

          _tab.setAttribute('aria-selected', false);

          _tab.setAttribute('tabindex', -1);

          panel.classList.toggle(ClassName$1.ACTIVE, false);
        }
      }
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('click', function (event) {
        if (isCustom(event) || !event.target.matches(Selector$1.TAB)) {
          return;
        }

        selectTab(event.target);
      });
    }

    var BUTTON_SELECTOR = '.yfm-clipboard-button';

    function copyToClipboard(text) {
      if (!text) {
        return Promise.resolve();
      }

      if (navigator.clipboard && typeof navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }

      var textarea = document.createElement('textarea');
      textarea.setAttribute('style', 'position: absolute; left: 1000%');
      textarea.textContent = text;
      document.body.append(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return Promise.resolve();
    }

    function notifySuccess(svgButton) {
      if (!svgButton) {
        return;
      }

      var id = svgButton.getAttribute('data-animation');
      var icon = document.getElementById("visibileAnimation-" + id);

      if (!icon) {
        return;
      }

      icon.beginElement();
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('click', function (event) {
        if (isCustom(event) || !event.target.matches(BUTTON_SELECTOR)) {
          return;
        }

        var parent = event.target.parentNode;

        if (!parent) {
          return;
        }

        var code = parent.querySelector('pre code');

        if (!code) {
          return;
        }

        copyToClipboard(code.innerText).then(function () {
          notifySuccess(parent.querySelector('.yfm-clipboard-button'));
        });
      });
    }

    var Selector = {
      CUT: '.yfm .yfm-cut',
      TITLE: '.yfm .yfm-cut-title',
      CONTENT: '.yfm .yfm-cut-content'
    };
    var ClassName = {
      OPEN: 'open'
    };

    function toggleCut(element) {
      var cutEl = element.parentNode;
      cutEl.classList.toggle(ClassName.OPEN);
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('click', function (event) {
        if (isCustom(event) || !event.target.matches(Selector.TITLE)) {
          return;
        }

        toggleCut(event.target);
      });
    }

}));
