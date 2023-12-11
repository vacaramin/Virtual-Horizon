package controllers

import (
	"Virtual-Horizon/src/utils"

	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type QuizController struct{}

type QuizFunctions interface {
	GetQuiz(*gin.Context)
}

func (*QuizController) GetQuiz(ctx *gin.Context) {

	user, err := utils.GetUserFromToken(ctx)
	if err != nil {
		log.Println(err)
	}
	// user mil gaya
	// get subject detail from request
	//
	// var Notifications models.Notifications

	// initializers.DB.
	// 	Where("user_id = ?", user.ID).
	// 	//Order("created_at DESC").
	// 	Find(&Notifications)

	ctx.JSON(http.StatusOK, gin.H{
		"status": "Success",
		"user":   user.ID,
	})
}
