package controllers

import (
	"context"
	"fmt"

	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/methi2554/app/ent"
	"github.com/methi2554/app/ent/drugtype"
)

// DrugTypeController defines the struct for the drugtype controller
type DrugTypeController struct {
	client *ent.Client
	router gin.IRouter
}

// DrugType defines the struct for the drugtype
type DrugType struct {
	DrugTypeName string
}

// CreateDrugType handles POST requests for adding drugtype entities
// @Summary Create drugtype
// @Description Create drugtype
// @ID create-drugtype
// @Accept   json
// @Produce  json
// @Param drugtype body ent.DrugType true "DrugType entity"
// @Success 200 {object} ent.DrugType
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /drugtypes [post]
func (ctl *DrugTypeController) CreateDrugType(c *gin.Context) {
	obj := ent.DrugType{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "drugtype binding failed",
		})
		return
	}

	e, err := ctl.client.DrugType.
		Create().
		SetName(obj.Name).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, e)
}

// GetDrugtype handles GET requests to retrieve a drugtype entity
// @Summary Get a drugtype entity by ID
// @Description get drugtype by ID
// @ID get-drugtype
// @Produce  json
// @Param id path int true "DrugType ID"
// @Success 200 {object} ent.DrugType
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /drugtypes/{id} [get]
func (ctl *DrugTypeController) GetDrugType(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	u, err := ctl.client.DrugType.
		Query().
		Where(drugtype.IDEQ(int(id))).
		Only(context.Background())

	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, u)
}

// ListDrugType handles request to get a list of drugtype entities
// @Summary List drugtype entities
// @Description list drugtype entities
// @ID list-drugtype
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.DrugType
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /drugtypes [get]
func (ctl *DrugTypeController) ListDrugType(c *gin.Context) {
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

	drugtypes, err := ctl.client.DrugType.
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

	c.JSON(200, drugtypes)
}

// DeleteDrugType handles DELETE requests to delete a drugtype entity
// @Summary Delete a drugtype entity by ID
// @Description get drugtype by ID
// @ID delete-drugtype
// @Produce  json
// @Param id path int true "DrugType ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /drugtypes/{id} [delete]
func (ctl *DrugTypeController) DeleteDrugType(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.DrugType.
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

// UpdateDrugType handles PUT requests to update a drugtype entity
// @Summary Update a drugtype entity by ID
// @Description update drugtype by ID
// @ID update-drugtype
// @Accept   json
// @Produce  json
// @Param id path int true "DrugType ID"
// @Param drugtype body ent.DrugType true "DrugType entity"
// @Success 200 {object} ent.DrugType
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /drugtypes/{id} [put]
func (ctl *DrugTypeController) UpdateDrugType(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.DrugType{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "drugtype binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	u, err := ctl.client.DrugType.
		UpdateOneID(int(id)).
		SetName(obj.Name).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, u)
}

// NewDrugTypeController creates and registers handles for the drugtype controller
func NewDrugTypeController(router gin.IRouter, client *ent.Client) *DrugTypeController {
	uc := &DrugTypeController{
		client: client,
		router: router,
	}

	uc.register()

	return uc

}

func (ctl *DrugTypeController) register() {
	drugtypes := ctl.router.Group("/drugtypes")

	drugtypes.GET("", ctl.ListDrugType)

	// CRUD
	drugtypes.POST("", ctl.CreateDrugType)
	drugtypes.GET(":id", ctl.GetDrugType)
	drugtypes.PUT(":id", ctl.UpdateDrugType)
	drugtypes.DELETE(":id", ctl.DeleteDrugType)
}
