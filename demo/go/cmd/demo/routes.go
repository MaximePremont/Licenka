package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

type FormRequestBody struct {
	Address  string `form:"address"`
	Password string `form:"password"`
}

type Result struct {
	License bool `json:"license"`
}

func ApproveLicense(c *gin.Context) {
	licenseId := os.Getenv("LICENSE_ID")
	url := "https://www.licenka.space/approve?id=" + licenseId
	fmt.Println(url)
	c.Redirect(http.StatusMovedPermanently, "https://www.licenka.space/approve?id="+licenseId)
}

func Verify(c *gin.Context) {
	var requestBody FormRequestBody

	if err := c.Bind(&requestBody); err != nil {
		fmt.Println()
		c.JSON(http.StatusForbidden, gin.H{"message": "Invalid credentials"})
		c.Abort()
		return
	}

	licenseId := os.Getenv("LICENSE_ID")
	resp, err := http.Get("https://www.licenka.space/api/checkLicense?userAddress=" + requestBody.Address + "&licenseId=" + licenseId + "&userPassword=" + requestBody.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal server error"})
		c.Abort()
		return
	}

	var res Result
	err = json.NewDecoder(resp.Body).Decode(&res)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal server error"})
		c.Abort()
		return
	}

	if res.License {
		c.Redirect(http.StatusMovedPermanently, "http://localhost:8080/games")
	} else {
		c.Redirect(http.StatusMovedPermanently, "http://localhost:8080?warning=Invalid%20license")
	}
}
