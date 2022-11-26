package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

type FormRequestBody struct {
	NonceSigned string `json:"nonce_signed"`
	Address     string `json:"address"`
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
		c.JSON(http.StatusForbidden, gin.H{"message": "Invalid query, check body content"})
		c.Abort()
		return
	}

	licenseId := os.Getenv("LICENSE_ID")
	resp, err := http.Get("https://www.licenka.space/api/wallet/verify?signedMessage=" + requestBody.NonceSigned + "&licenseId=" + licenseId + "&walletAddress=" + requestBody.Address)
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
		c.JSON(http.StatusOK, gin.H{"license": true})
	} else {
		c.JSON(http.StatusForbidden, gin.H{"license": false})
	}
}
