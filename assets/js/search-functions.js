const url = 'http://jsonplaceholder.typicode.com/users';




// ? Request(url)
	// ? Request(url, options)
	// ? options: method, headers, body, mode
	// ? method: GET, POST, PUT, DELETE, OPTIONS

	// ? Headers()
	// ? .append(name, val)
	// ? Content-type(body req), -length(body req), Accept, Accept-lang,
	// ? x-Requested-with, User-Agent ====== kinda deprecated

	// ? CORS = a policy for determining whether or not you are allowed to get a resource back from one domain to another. example: you are on pornhub.com and you make a JSON request that is coming from toysrus.net, there will be a policy on the server that says whether or not you are allowed to use that.. you are not allowed to use toysrus pls. you can get the data back but cors decides whether you can view them toys.

	// let h = new Headers()

	// let req = new Request(url, {
	// 	method: 'GET',
	// 	headers: h,
	// 	mode: 'cors'
	// })

	// h.append('Accept', 'application/json')


// fetch(req)
// 	.then((res) => {
// 		if (res.ok) {
// 			return res.json()
// 		} else {
// 			throw new Error('stuff i happened mang')
// 		}
// 	})
// 	.then((jsonData) => {
// 		console.log(jsonData)
// 	})
// 	.catch((err) => {
// 		console.log('Error:', err.message)
// 	})
