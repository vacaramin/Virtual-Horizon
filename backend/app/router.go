package app

func mapUrls() {
	router.POST("api/register", users.register)
}
