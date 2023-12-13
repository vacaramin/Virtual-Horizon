package controllers

import (
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/src/quiz/models"
	"Virtual-Horizon/src/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type QuizController struct{}

type QuizFunctions interface {
	GetQuiz(*gin.Context)
	AddQuiz(*gin.Context)
}

func (*QuizController) AddQuiz(ctx *gin.Context) {
	// Check user authorization
	_, err := utils.GetUserFromToken(ctx)
	if err != nil {
		log.Println(err)
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"status": "failed",
			"error":  "Unauthorized",
		})
		return
	}

	// Define request body structure
	type Options struct {
		Option  string `json:"option"`
		Correct bool   `json:"correct"`
	}

	type QuizQuestion struct {
		Message  string    `json:"message"`
		Question string    `json:"question"`
		Options  []Options `json:"options"`
	}

	type RequestBody struct {
		CourseID  uint           `json:"course_id"`
		Message   string         `json:"message"`
		Questions []QuizQuestion `json:"questions"`
	}

	var body RequestBody

	// Bind JSON request body
	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "failed",
			"error":  "Invalid request body",
		})
		return
	}

	log.Println("Body after binding", body)

	// Create quiz record
	quiz := models.Quiz{
		CourseID: body.CourseID,
		Message:  body.Message,
	}
	initializers.DB.Create(&quiz)

	// Create quiz questions and options
	for _, q := range body.Questions {
		quizQuestion := models.QuizQuestion{
			QuizID:   quiz.ID,
			Message:  q.Message,
			Question: q.Question,
		}
		initializers.DB.Create(&quizQuestion)

		for _, o := range q.Options {
			quizOption := models.QuizQuestionOption{
				QuizQuestionID: quizQuestion.ID,
				Option:         o.Option,
				Correct:        o.Correct,
			}
			initializers.DB.Create(&quizOption)
		}
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": "Success",
		"Quiz":   quiz,
	})
}
func (*QuizController) GetQuiz(ctx *gin.Context) {
	// Finding User From Token Pretty much useless just for authorization
	_, err := utils.GetUserFromToken(ctx)
	if err != nil {
		log.Println(err)
	}

	var Body struct {
		Subject int `json:"Subject"`
	}

	if err := ctx.ShouldBindJSON(&Body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "failed",
			"error":  "Invalid request body",
		})
		return
	}

	log.Println("Body after binding", Body)

	var Quiz models.Quizzes
	result := initializers.DB.
		Preload("Questions.Options").
		Where("course_id = ?", Body.Subject).
		Find(&Quiz)

	if result.Error != nil {
		log.Println(result.Error)
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": "Success",
		"Quiz":   Quiz,
	})
}
