package controllers

import (
	"fmt"
	"context"
	"strconv"

	"github.com/B6001186/Contagions/ent"
	"github.com/B6001186/Contagions/ent/nametitle"
	"github.com/gin-gonic/gin"
)

// NametitleController defines the struct for the nametitle controller
type NametitleController struct {
	client *ent.Client
	router gin.IRouter
}

// Nametitle defines the struct for the nametitle controller
type Nametitle struct {
	Title string
}

// CreateNametitle handles POST requests for adding nametitle entities
// @Summary Create nametitle
// @Description Create nametitle
// @ID create-nametitle
// @Accept   json
// @Produce  json
// @Param nametitle body ent.Nametitle true "Nametitle entity"
// @Success 200 {object} ent.Nametitle
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /nametitles [post]
func (ctl *NametitleController) CreateNametitle(c *gin.Context) {
	obj := ent.Nametitle{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "nametitle binding failed",
		})
		return
	}

	n, err := ctl.client.Nametitle.
		Create().
		SetTitle(obj.Title).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, n)
}

// GetNametitle handles GET requests to retrieve a nametitle entity
// @Summary Get a nametitle entity by ID
// @Description get nametitle by ID
// @ID get-nametitle
// @Produce  json
// @Param id path int true "Nametitle ID"
// @Success 200 {object} ent.Nametitle
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /nametitles/{id} [get]
func (ctl *NametitleController) GetNametitle(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	n, err := ctl.client.Nametitle.
		Query().
		Where(nametitle.IDEQ(int(id))).
		Only(context.Background())
	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, n)
}

// ListNametitle handles request to get a list of nametitle entities
// @Summary List nametitle entities
// @Description list nametitle entities
// @ID list-nametitle
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Nametitle
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /nametitles [get]
func (ctl *NametitleController) ListNametitle(c *gin.Context) {
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

	nametitles, err := ctl.client.Nametitle.
		Query().
		Limit(limit).
		Offset(offset).
		All(context.Background())
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, nametitles)
}

// DeleteNametitle handles DELETE requests to delete a nametitle entity
// @Summary Delete a nametitle entity by ID
// @Description get nametitle by ID
// @ID delete-nametitle
// @Produce  json
// @Param id path int true "Nametitle ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /nametitles/{id} [delete]
func (ctl *NametitleController) DeleteNametitle(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Nametitle.
		DeleteOneID(int(id)).
		Exec(context.Background())
	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{"result": fmt.Sprintf("ok deleted %v", id)})
}

// UpdateNametitle handles PUT requests to update a nametitle entity
// @Summary Update a nametitle entity by ID
// @Description update nametitle by ID
// @ID update-nametitle
// @Accept   json
// @Produce  json
// @Param id path int true "Nametitle ID"
// @Param nametitletype body ent.Nametitle true "Nametitle entity"
// @Success 200 {object} ent.Nametitle
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /nametitles/{id} [put]
func (ctl *NametitleController) UpdateNametitle(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.Nametitle{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "nametitle binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	n, err := ctl.client.Nametitle.
		UpdateOneID(int(id)).
		SetTitle(obj.Title).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, n)
}


// NewNametitleController creates and registers handles for the nametitle controller
func NewNametitleController(router gin.IRouter, client *ent.Client) *NametitleController {
	nc := &NametitleController{
		client: client,
		router: router,
	}
	nc.register()
	return nc
}

func (ctl *NametitleController) register() {
	nametitles := ctl.router.Group("/nametitles")

	nametitles.GET("", ctl.ListNametitle)
	nametitles.POST("", ctl.CreateNametitle)
	nametitles.GET(":id", ctl.GetNametitle)
	nametitles.PUT("id", ctl.UpdateNametitle)
	nametitles.DELETE(":id", ctl.DeleteNametitle)
}