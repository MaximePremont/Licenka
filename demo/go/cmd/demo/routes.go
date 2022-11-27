package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

type RequestBody struct {
	Nonce_signed string `json:"nonce_signed"`
	Address      string `json:"address"`
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
	var requestBody RequestBody

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println("Test")
		c.JSON(http.StatusForbidden, gin.H{"message": "Invalid query, check body content"})
		return
	}
	licenseId := os.Getenv("LICENSE_ID")
	resp, err := http.Get("http://localhost:3000/api/wallet/verify?signedMessage=" + requestBody.Nonce_signed + "&licenseId=" + licenseId + "&walletAddress=" + requestBody.Address)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal server error"})
		return
	}

	var res Result
	err = json.NewDecoder(resp.Body).Decode(&res)
	fmt.Println("res ", res)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal server error"})
		return
	}

	if res.License {
		c.JSON(http.StatusOK, gin.H{"license": true})
	} else {
		fmt.Println("Test")
		c.JSON(http.StatusForbidden, gin.H{"license": false})
	}
}
