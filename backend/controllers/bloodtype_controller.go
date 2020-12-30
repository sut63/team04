package controllers

import (
	"context"
	"strconv"

	"github.com/Sujitnapa21/app/ent"
	"github.com/Sujitnapa21/app/ent/bloodtype"
	"github.com/gin-gonic/gin"
)

// BloodtypeController defines the struct for the bloodtype controller
type BloodtypeController struct {
	client *ent.Client
	router gin.IRouter
}

// Bloodtype defines the struct for the bloodtype controller
type Bloodtype struct {
	BloodtypeName string
}

// CreateBloodtype handles POST requests for adding bloodtype entities
// @Summary Create bloodtype
// @Description Create bloodtype
// @ID create-bloodtype
// @Accept   json
// @Produce  json
// @Param bloodtype body ent.Bloodtype true "Bloodtype entity"
// @Success 200 {object} ent.Bloodtype
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /bloodtypes [post]
func (ctl *BloodtypeController) CreateBloodtype(c *gin.Context) {
	obj := ent.Bloodtype{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "bloodtype binding failed",
		})
		return
	}

	b, err := ctl.client.Bloodtype.
		Create().
		SetBloodtypeName(obj.BloodtypeName).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, b)
}

// GetBloodtype handles GET requests to retrieve a bloodtype entity
// @Summary Get a bloodtype entity by ID
// @Description get bloodtype by ID
// @ID get-bloodtype
// @Produce  json
// @Param id path int true "Bloodtype ID"
// @Success 200 {object} ent.Bloodtype
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /bloodtypes/{id} [get]
func (ctl *BloodtypeController) GetBloodtype(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	b, err := ctl.client.Bloodtype.
		Query().
		Where(bloodtype.IDEQ(int(id))).
		Only(context.Background())
	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, b)
}

// ListBloodtype handles request to get a list of bloodtype entities
// @Summary List bloodtype entities
// @Description list bloodtype entities
// @ID list-bloodtype
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Bloodtype
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /bloodtypes [get]
func (ctl *BloodtypeController) ListBloodtype(c *gin.Context) {
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

	bloodtypes, err := ctl.client.Bloodtype.
		Query().
		Limit(limit).
		Offset(offset).
		All(context.Background())
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, bloodtypes)
}

// NewBloodtypeController creates and registers handles for the bloodtype controller
func NewBloodtypeController(router gin.IRouter, client *ent.Client) *BloodtypeController {
	bc := &BloodtypeController{
		client: client,
		router: router,
	}
	bc.register()
	return bc
}

func (ctl *BloodtypeController) register() {
	bloodtypes := ctl.router.Group("/bloodtypes")

	bloodtypes.GET("", ctl.ListBloodtype)
	bloodtypes.POST("", ctl.CreateBloodtype)
	bloodtypes.GET(":id", ctl.GetBloodtype)
}
