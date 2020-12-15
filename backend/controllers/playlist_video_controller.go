package controllers

import (
	"context"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/tanapon395/playlist-video/ent"
	"github.com/tanapon395/playlist-video/ent/playlist"
	"github.com/tanapon395/playlist-video/ent/resolution"
	"github.com/tanapon395/playlist-video/ent/video"
)

type PlaylistVideoController struct {
	client *ent.Client
	router gin.IRouter
}

type PlaylistVideo struct {
	Playlist   int
	Video      int
	Resolution int
	Added      string
}

// CreatePlaylistVideo handles POST requests for adding playlist-video entities
// @Summary Create playlist-video
// @Description Create playlist-video
// @ID create-playlist-video
// @Accept   json
// @Produce  json
// @Param playlist-video body ent.Playlist_Video true "Playlist_Video entity"
// @Success 200 {object} ent.Playlist_Video
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /playlist-videos [post]
func (ctl *PlaylistVideoController) CreatePlaylistVideo(c *gin.Context) {
	obj := PlaylistVideo{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "playlist video binding failed",
		})
		return
	}

	p, err := ctl.client.Playlist.
		Query().
		Where(playlist.IDEQ(int(obj.Playlist))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "playlist not found",
		})
		return
	}

	v, err := ctl.client.Video.
		Query().
		Where(video.IDEQ(int(obj.Video))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "video not found",
		})
		return
	}

	r, err := ctl.client.Resolution.
		Query().
		Where(resolution.IDEQ(int(obj.Resolution))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "resolution not found",
		})
		return
	}

	time, err := time.Parse(time.RFC3339, obj.Added)
	pv, err := ctl.client.Playlist_Video.
		Create().
		SetAddedTime(time).
		SetPlaylist(p).
		SetVideo(v).
		SetResolution(r).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, gin.H{
		"status": true,
		"data":   pv,
	})
}

// ListPlaylistVideo handles request to get a list of playlist-video entities
// @Summary List playlist-video entities
// @Description list playlist-video entities
// @ID list-playlist-video
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Playlist_Video
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /playlist-videos [get]
func (ctl *PlaylistVideoController) ListPlaylistVideo(c *gin.Context) {
	limitQuery := c.Query("limit")
	limit := 10
	if limitQuery != "" {
		limit64, err := strconv.ParseInt(limitQuery, 10, 64)
		if err == nil {
			limit = int(limit64)
		}
	}

	offsetQuery := c.Query("offset")
	offset := 0
	if offsetQuery != "" {
		offset64, err := strconv.ParseInt(offsetQuery, 10, 64)
		if err == nil {
			offset = int(offset64)
		}
	}

	playlistVideos, err := ctl.client.Playlist_Video.
		Query().
		WithPlaylist().
		WithResolution().
		WithVideo().
		Limit(limit).
		Offset(offset).
		All(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, playlistVideos)
}

// NewPlaylistVideoController creates and registers handles for the playlist-video controller
func NewPlaylistVideoController(router gin.IRouter, client *ent.Client) *PlaylistVideoController {
	pvc := &PlaylistVideoController{
		client: client,
		router: router,
	}

	pvc.register()

	return pvc

}

func (ctl *PlaylistVideoController) register() {
	playlistVideos := ctl.router.Group("/playlist-videos")

	playlistVideos.POST("", ctl.CreatePlaylistVideo)
	playlistVideos.GET("", ctl.ListPlaylistVideo)

}
