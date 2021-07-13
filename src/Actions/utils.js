export const normalizeResponseErrors = res => {
	if (!res.ok) {
		if (
			res.headers.has('content-type') && 	//	If the error response contains JSON it will return a rejected promise containing the decoded JSON.
			res.headers.get('content-type').startsWith('application/json')
		) {
			//	decode the json error
			return res.json().then(err => Promise.reject(err));	//	If the error doesn't contain JSON then returns a rejected promise with status text
		}
		return Promise.reject({
			code: res.status,
			message: res.statusText
		});
	}
	return res;	//	If no error continue with the promise chain
};