package controllers

import (
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tanapon395/playlist-video/ent"
	"github.com/tanapon395/playlist-video/ent/resolution"
)

type ResolutionController struct {
	client *ent.Client
	router gin.IRouter
}

// CreateResolution handles POST requests for adding resolution entities
// @Summary Create resolution
// @Description Create resolution
// @ID create-resolution
// @Accept   json
// @Produce  json
// @Param resolution body ent.Resolution true "Resolution entity"
// @Success 200 {object} ent.Resolution
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /resolutions [post]
func (ctl *ResolutionController) CreateResolution(c *gin.Context) {
	obj := ent.Resolution{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "resolution binding failed",
		})
		return
	}

	r, err := ctl.client.Resolution.
		Create().
		SetValue(obj.Value).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, r)
}

// GetResolution handles GET requests to retrieve a resolution entity
// @Summary Get a resolution entity by ID
// @Description get resolution by ID
// @ID get-resolution
// @Produce  json
// @Param id path int true "Resolution ID"
// @Success 200 {object} ent.Resolution
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /resolutions/{id} [get]
func (ctl *ResolutionController) GetResolution(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	r, err := ctl.client.Resolution.
		Query().
		Where(resolution.IDEQ(int(id))).
		Only(context.Background())

	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, r)
}

// ListResolution handles request to get a list of resolution entities
// @Summary List resolution entities
// @Description list resolution entities
// @ID list-resolution
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Resolution
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /resolutions [get]
func (ctl *ResolutionController) ListResolution(c *gin.Context) {
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

	resolutions, err := ctl.client.Resolution.
		Query().
		Limit(limit).
		Offset(offset).
		All(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, resolutions)
}

// NewResolutionController creates and registers handles for the resolution controller
func NewResolutionController(router gin.IRouter, client *ent.Client) *ResolutionController {
	rc := &ResolutionController{
		client: client,
		router: router,
	}

	rc.register()

	return rc

}

func (ctl *ResolutionController) register() {
	resolutions := ctl.router.Group("/resolutions")

	resolutions.POST("", ctl.CreateResolution)
	resolutions.GET(":id", ctl.GetResolution)
	resolutions.GET("", ctl.ListResolution)

}
