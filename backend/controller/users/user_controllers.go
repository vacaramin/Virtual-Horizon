package users

import (
	"Virtual-Horizon/backend/domain/users"
	"Virtual-Horizon/backend/services"
	"Virtual-Horizon/backend/utils/errors"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var user users.User
	if err := c.ShouldBindJSON(&user); err != nil {
		err := errors.NewBadRequestError("Invalid JSON body")
		c.JSON(err.Status, err)
		return
	}
	services.CreateUser(user)
	c.JSON(200, "Register:")
}
