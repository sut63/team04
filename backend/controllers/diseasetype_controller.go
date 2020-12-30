package controllers

import (
	"fmt"
	"context"
	"strconv"

	"github.com/KOB4k/app/ent"
	"github.com/KOB4k/app/ent/diseasetype"
	"github.com/gin-gonic/gin"
)

// DiseasetypeController defines the struct for the diseasetype controller
type DiseasetypeController struct {
	client *ent.Client
	router gin.IRouter
}

// Diseasetype defines the struct for the diseasetype controller
type Diseasetype struct {
	DiseaseTypeName  string
}

// CreateDiseasetype handles POST requests for adding diseasetype entities
// @Summary Create diseasetype
// @Description Create diseasetype
// @ID create-diseasetype
// @Accept   json
// @Produce  json
// @Param diseasetype body ent.Diseasetype true "Diseasetype entity"
// @Success 200 {object} ent.Diseasetype
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /diseasetypes [post]
func (ctl *DiseasetypeController) CreateDiseasetype(c *gin.Context) {
	obj := ent.Diseasetype{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "diseasetype binding failed",
		})
		return
	}

	dt, err := ctl.client.Diseasetype.
		Create().
		SetDiseaseTypeName (obj.DiseaseTypeName ).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, dt)
}

// GetDiseasetype handles GET requests to retrieve a diseasetype entity
// @Summary Get a diseasetype entity by ID
// @Description get diseasetype by ID
// @ID get-diseasetype
// @Produce  json
// @Param id path int true "Diseasetype ID"
// @Success 200 {object} ent.Diseasetype
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /diseasetypes/{id} [get]
func (ctl *DiseasetypeController) GetDiseasetype(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	dt, err := ctl.client.Diseasetype.
		Query().
		Where(diseasetype.IDEQ(int(id))).
		Only(context.Background())
	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, dt)
}

// ListDiseasetype handles request to get a list of diseasetype entities
// @Summary List diseasetype entities
// @Description list diseasetype entities
// @ID list-diseasetype
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Diseasetype
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /diseasetypes [get]
func (ctl *DiseasetypeController) ListDiseasetype(c *gin.Context) {
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

	diseasetypes, err := ctl.client.Diseasetype.
		Query().
		Limit(limit).
		Offset(offset).
		All(context.Background())
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, diseasetypes)
}

// DeleteDiseasetype handles DELETE requests to delete a diseasetype entity
// @Summary Delete a diseasetype entity by ID
// @Description get diseasetype by ID
// @ID delete-diseasetype
// @Produce  json
// @Param id path int true "Diseasetype ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /diseasetypes/{id} [delete]
func (ctl *DiseasetypeController) DeleteDiseasetype(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Diseasetype.
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

// UpdateDiseasetype handles PUT requests to update a diseasetype entity
// @Summary Update a diseasetype entity by ID
// @Description update diseasetype by ID
// @ID update-diseasetype
// @Accept   json
// @Produce  json
// @Param id path int true "Diseasetype ID"
// @Param diseasetype body ent.Diseasetype true "Diseasetype entity"
// @Success 200 {object} ent.Diseasetype
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /diseasetypes/{id} [put]
func (ctl *DiseasetypeController) UpdateDiseasetype(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.Diseasetype{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "diseasetype binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	u, err := ctl.client.Diseasetype.
		UpdateOneID(int(id)).
		SetDiseaseTypeName (obj.DiseaseTypeName).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, u)
}



// NewDiseasetypeController creates and registers handles for the diseasetype controller
func NewDiseasetypeController(router gin.IRouter, client *ent.Client) *DiseasetypeController {
	dtc := &DiseasetypeController{
		client: client,
		router: router,
	}
	dtc.register()
	return dtc
}

func (ctl *DiseasetypeController) register() {
	diseasetypes := ctl.router.Group("/diseasetypes")

	diseasetypes.GET("", ctl.ListDiseasetype)
	 // CRUD
	diseasetypes.POST("", ctl.CreateDiseasetype)
	diseasetypes.GET(":id", ctl.GetDiseasetype)
	diseasetypes.PUT(":id", ctl.UpdateDiseasetype)
	diseasetypes.DELETE(":id", ctl.DeleteDiseasetype)
}
