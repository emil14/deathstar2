const { location, addEventListener }  = window;

const isLocalhost = Boolean(
  location.hostname === 'localhost' ||
  location.hostname === '[::1]' ||
  location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, location);

    if (publicUrl.origin !== location.origin) {
      return;
    }

    addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (!isLocalhost) {
        registerValidSW(swUrl);
      } else {
        checkValidServiceWorker(swUrl);
      }
    });
  }
}

const registerValidSW = async swUrl => {
  const registration = await navigator.serviceWorker.register(swUrl);

  registration.onupdatefound = () => {
    const installingWorker = registration.installing;
    installingWorker.onstatechange = () => {
      if (installingWorker.state === 'installed') {
        if (navigator.serviceWorker.controller) {
          console.log('New content is available; please refresh.');
        } else {
          console.log('Content is cached for offline use.');
        }
      }
    };
  };
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {

    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl)
    .then(response => {
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            location.reload();
          });
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
