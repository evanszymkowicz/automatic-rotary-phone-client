const isLocalHost = Boolean (
	window.location.hostname === 'localhost' || 
	//	[::1] IPv6 localhost address
	window.location.hostname === '[::1]' ||
	window.location.hostname.match (
		 /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
	)
);

export function register(config) {
	if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
		const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
			if (publicUrl.origin !== window.location.origin) {	//	service worker will not work if public_url is not the same as origin
				return; //	see https://github.com/facebook/create-react-app/issues/2374
			}
	}

	window.addEventListener('load', () => {
		const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
		// gonna run this when deployed to localhost to check if the service worker exists or not
		if (isLocalHost) {
			checkValidServiceWorker(swUrl, config);
			navigator.serviceWorker.ready.then(() => {
				console.log (
					'This web app is being served cache-first by a service ' + 'worker. To learn more, visit http://bit.ly/CRA-PWA'
				);
			});
		} else {
			registerValidSW(swUrl, config);
		}
	});
}

function registerValidSW(swUrl, config) {
	navigator.serviceWorker
		.register(swUrl)
		.then(registration => {
			registration.onupdatefound = () => {
				const installingWorker = registration.installing;
				if (installingWorker == null) {
					return;
				}
				installingWorker.onstatechange = () => {
					if (installingWorker.state === 'installed') { //	this is to make sure that the updated prechached content has been fetched
						if (navigator.serviceWorker.controller) {		//	but the previous service worker will still be installed and serve the older content until all client tabs are closed
							console.log(
								'New content is available and will be used when all ' +
								'tabs for this page are closed. See http://bit.ly/CRA-PWA.'
							);
							//	run callback
							if (config && config.onUpdate) {
								config.onUpdate(registration);
							}
						} else {
							console.log('Content is cached for offline use.'); //	now everything has been cached

							//	run another callback
							if (config && config.onSuccess) {
								config.onSuccess(registration);
							}
						}
					}
				};
			};
		})
		.catch(error => {
			console.error('Error during service worker registration:', error);
		});
}

function checkValidServiceWorker(swUrl, config) {
	fetch(swUrl)	//	run this to make sure the servive worker can be found
		.then(response => {
			const contentType = response.headers.get('content-type');
			if (
				response.status === 404 || 
				(contentType != null && contentType.indexOf('javascript') === -1)
			) {
				//	no service worker found finna reload the page
				navigator.serviceWorker.ready.then(registration => {
					registration.unregister().then(() => {
						window.location.reload();
					});
				});
			} else { // Found a service worker. All good.
				registerValidSW(swUrl, config);
			}
		})
		.catch(() => {
			console.log (
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
