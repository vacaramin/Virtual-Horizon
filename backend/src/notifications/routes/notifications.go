package routes

import (
	"Virtual-Horizon/src/notifications/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(engine *gin.Engine, controller controllers.NotificationController) {
	enrollmentRoutes := engine.Group("notification")
	enrollmentRoutes.POST("getNotifications", controller.GetNotifications)
}
