package controllers

import (
	"remember-me/model"
	"remember-me/utils/logs"

	"github.com/labstack/echo/v4"
)

type PostCreateResponse struct {
	Status string `json:"status"`
	PostID uint32 `json:"post_id"`
}

func PostPOST(c echo.Context) error {
	logs.Debug("POST /post")

	postRequest := model.Post{}
	_ok, err := Bind(c, &postRequest)
	if !_ok {
		return err
	}

	post, err := model.CreatePost(postRequest.UserID, postRequest.Year, postRequest.Month, postRequest.Title, postRequest.Text, postRequest.ImageURL)
	if err != nil {
		return ResponseInternalServerError(c, "Failed to create post into database.", err)
	}

	return ResponseOK(c, PostCreateResponse{
		Status: "success ",
		PostID: post.ID,
	})
}

type PostResponse struct {
	ID       uint32 `json:"post_id"`
	UserID   uint32 `json:"user_id"`
	Year     uint32 `json:"year"   `
	Month    uint32 `json:"month"  `
	Title    string `json:"title"  `
	Text     string `json:"text"   `
	ImageURL string `json:"image_url"`
}

type PostGetResponse struct {
	PostList []PostResponse `json:"posts"`
}

func PostGET(c echo.Context) error {
	logs.Debug("GET /post")

	posts, err := model.GetPostsList()
	if err != nil {
		return ResponseInternalServerError(c, "Get posts list failed.", err)
	}

	resp := PostGetResponse{}
	for _, post := range posts {
		resp.PostList = append(resp.PostList, PostResponse{
			ID:       post.ID,
			UserID:   post.UserID,
			Year:     post.Year,
			Month:    post.Month,
			Title:    post.Title,
			Text:     post.Text,
			ImageURL: post.ImageURL,
		})
	}

	return ResponseOK(c, resp)
}
