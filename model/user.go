package model

import (
	"remember-me/utils/logs"
	"time"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

type User struct {
	ID        uint32         `json:"user_id"    form:"user_id"    query:"user_id"   gorm:"primaryKey;unique;not null"`
	CreatedAt time.Time      `json:"created_at" form:"created_at" query:"created_at"`
	UpdatedAt time.Time      `json:"updated_at" form:"updated_at" query:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" form:"deleted_at" query:"deleted_at"`
	UserName  string         `json:"user_name"  form:"user_name"  query:"user_name"`
	Deleted   bool           `json:"deleted"    form:"deleted"    query:"deleted"   gorm:"not null"`
}

func UserRegister(userName string) (User, error) {
	m := GetModel()
	defer m.Close()

	user := User{
		UserName: userName,
		Deleted:  false,
	}
	result := m.tx.Create(&user)
	if result.Error != nil {
		logs.Warn("Create user failed.", zap.Error(result.Error), zap.Any("user", user))
		m.Abort()
		return user, result.Error
	}

	m.tx.Commit()
	return user, nil
}

func FindUserByID(userID uint32) (User, error) {
	m := GetModel()
	defer m.Close()

	var user User
	result := m.tx.First(&user, userID)
	if result.Error != nil {
		logs.Info("Find user by id failed.", zap.Error(result.Error))
		m.Abort()
		return user, result.Error
	}

	m.tx.Commit()
	return user, nil
}

// func FindUserByName(userName string) (User, error) {
// 	m := GetModel()
// 	defer m.Close()

// 	var user User
// 	result := m.tx.Model(&User{}).Where("user_name = ?", userName).First(&user)
// 	if result.Error != nil {
// 		logs.Info("Find user by name failed.", zap.Error(result.Error))
// 		m.Abort()
// 		return user, result.Error
// 	}

// 	m.tx.Commit()
// 	return user, nil
// }

func UpdateUserName(userID uint32, userName string) (User, error) {
	m := GetModel()
	defer m.Close()

	var user User
	result := m.tx.First(&user, userID).Update("user_name", userName)
	if result.Error != nil {
		logs.Info("Update user name failed.", zap.Error(result.Error))
		m.Abort()
		return user, result.Error
	}

	m.tx.Commit()
	return user, nil
}
