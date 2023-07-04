package model

import (
	"remember-me/utils/logs"
	"time"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

type Post struct {
	ID        uint32         `json:"post_id"        form:"post_id"        query:"post_id"      gorm:"primaryKey;unique;not null"`
	CreatedAt time.Time      `json:"created_at"     form:"created_at"     query:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"     form:"updated_at"     query:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at"     form:"deleted_at"     query:"deleted_at"`
	UserID    uint32         `json:"user_id"        form:"user_id"        query:"user_id"      gorm:"column:user_id;not null"`
	Year      uint32         `json:"year"           form:"year"           query:"year"`
	Month     uint32         `json:"month"          form:"month"          query:"month"`
	Title     string         `json:"title"          form:"title"          query:"title"`
	Text      string         `json:"text"           form:"text"           query:"text"`
	ImageURL  string         `json:"image_url"           form:"image_url"           query:"image_url"`
}

func CreatePost(userID uint32, year uint32, month uint32, title string, text string, image_url string) (Post, error) {
	m := GetModel()
	defer m.Close()

	post := Post{
		UserID:   userID,
		Year:     year,
		Month:    month,
		Title:    title,
		Text:     text,
		ImageURL: image_url,
	}
	result := m.tx.Create(&post)
	if result.Error != nil {
		logs.Warn("Create post failed.", zap.Error(result.Error))
		m.Abort()
		return post, result.Error
	}

	m.tx.Commit()
	return post, nil
}

func FindPostByPostID(postID uint32) (Post, error) {
	m := GetModel()
	defer m.Close()

	var post Post
	result := m.tx.First(&post, postID)
	if result.Error != nil {
		logs.Info("Find post by id failed.", zap.Error(result.Error))
		m.Abort()
		return post, result.Error
	}

	m.tx.Commit()
	return post, nil
}

/**
 * 获取帖子列表
 **/
func GetPostsList() ([]Post, error) {
	m := GetModel()
	defer m.Close()

	var posts []Post
	result := m.tx.Model(&Post{})

	result.Find(&posts)
	if result.Error != nil {
		logs.Info("Find posts list failed.", zap.Error(result.Error))
		m.Abort()
		return posts, result.Error
	}

	m.tx.Commit()
	return posts, nil
}
