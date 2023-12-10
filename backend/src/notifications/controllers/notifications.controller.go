package controllers

import (
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/src/notifications/models"
	"Virtual-Horizon/src/utils"

	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type NotificationController struct{}

type NotificationFunctions interface {
	GetNotifications(*gin.Context)
}

func (*NotificationController) GetNotifications(ctx *gin.Context) {

	user, err := utils.GetUserFromToken(ctx)
	if err != nil {
		log.Println(err)
	}

	var Notifications models.Notifications

	initializers.DB.
		Where("user_id = ?", user.ID).
		//Order("created_at DESC").
		Find(&Notifications)

	ctx.JSON(http.StatusOK, gin.H{
		"status":               "Success",
		"EnrollmentController": Notifications,
	})
}
