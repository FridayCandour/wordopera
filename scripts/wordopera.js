// writing an object to take some cofigs need for building a blog
const config = function (object){
// the blog object
	return {
		domain: object.domain,
		name: object.name,
		metaTags: object.metaTags,
		theme: object.theme,
		description: object.description,
		plugins; object.plugins,
		auth: object.auth,
		wordoperaObject: object.wordoperaObject,
	}
}
