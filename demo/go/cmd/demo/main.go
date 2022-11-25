package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	router := gin.Default()
	router.GET("/approve", ApproveLicense)
	router.POST("/verify", Verify)
	router.Run("localhost:8080")
}
