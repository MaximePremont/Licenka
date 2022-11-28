package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type RequestBody struct {
	Nonce_signed string `json:"nonce_signed"`
	Address      string `json:"address"`
}

type Result struct {
	License bool `json:"verified"`
}

func ApproveLicense(c *gin.Context) {
	licenseId := os.Getenv("LICENSE_ID")
	baseUrl := os.Getenv("LICENKA_BASE_URL")
	url := baseUrl + "approve?id=" + licenseId
	c.Redirect(http.StatusMovedPermanently, url)
}

func Verify(c *gin.Context) {
	var requestBody RequestBody
	baseUrl := os.Getenv("LICENKA_BASE_URL")
	licenseId := os.Getenv("LICENSE_ID")

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println("Test")
		c.JSON(http.StatusForbidden, gin.H{"message": "Invalid query, check body content"})
		return
	}
	resp, err := http.Get(baseUrl + "/api/wallet/verify?signedMessage=" + requestBody.Nonce_signed + "&licenseId=" + licenseId + "&walletAddress=" + requestBody.Address)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal server error"})
		return
	}

	var res Result
	err = json.NewDecoder(resp.Body).Decode(&res)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal server error"})
		return
	}

	if res.License {
		c.JSON(http.StatusOK, gin.H{"license": true})
	} else {
		c.JSON(http.StatusForbidden, gin.H{"license": false})
	}
}
