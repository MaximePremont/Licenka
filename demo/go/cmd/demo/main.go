package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"time"
)

func AllowAll() gin.HandlerFunc {
	cfg := cors.Config{
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	cfg.AllowAllOrigins = true
	return cors.New(cfg)
}

func main() {
	godotenv.Load()
	router := gin.Default()
	router.Use(AllowAll())
	router.GET("/approve", ApproveLicense)
	router.POST("/verify", Verify)
	router.Run("localhost:8080")
}
