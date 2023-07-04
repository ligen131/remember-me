package qiniu

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/qiniu/go-sdk/v7/auth"
	"github.com/qiniu/go-sdk/v7/storage"
)

type Config struct {
	CdnUrl    string `yaml:"cdn_url"`
	AccessKey string `yaml:"access_key"`
	SecretKey string `yaml:"secret_key"`
	Bucket    string `yaml:"bucket"`
}

type UploadInfo struct {
	Key   string
	Token string
	Url   string
}

const SizeLimit = 1024 * 1024 * 10

var config *Config = nil

func InitQiniu(conf Config) error {
	config = &conf
	return nil
}

func GetUploadToken() (UploadInfo, error) {
	key := uuid.New().String()
	if config == nil {
		return UploadInfo{}, fmt.Errorf("qiniu not initialized")
	}

	putPolicy := storage.PutPolicy{
		Scope:      fmt.Sprintf("%s:%s", config.Bucket, key),
		FsizeLimit: SizeLimit,
	}

	mac := auth.New(config.AccessKey, config.SecretKey)
	return UploadInfo{
		Key:   key,
		Token: putPolicy.UploadToken(mac),
		Url:   config.CdnUrl + key,
	}, nil
}
