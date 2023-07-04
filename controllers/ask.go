package controllers

import (
	"fmt"
	"remember-me/model"
	"remember-me/shared/gpt"
	"remember-me/utils/logs"

	"github.com/labstack/echo/v4"
)

type AskRequest struct {
	UserID string `json:"user_id"`
	Prompt string `json:"prompt"`
}

type AskResponse struct {
	Answer string `json:"answer"`
}

func AskGET(c echo.Context) error {
	logs.Debug("GET /ask")

	prompt := c.QueryParam("prompt")

	posts, err := model.GetPostsList()
	if err != nil {
		return ResponseInternalServerError(c, "Get posts list failed.", err)
	}

	AllPosts := ""
	for index, post := range posts {
		AllPosts = AllPosts + fmt.Sprintf("\n\n相关事件 %d：%s\n时间：%d 年 %d 月\n%s", index+1, post.Title, post.Year, post.Month, post.Text)
	}

	ans, err := gpt.GptHandle(prompt + AllPosts)
	if err != nil {
		return ResponseInternalServerError(c, "Send prompt to gpt failed.", err)
	}

	return ResponseOK(c, AskResponse{
		Answer: ans,
	})
}
