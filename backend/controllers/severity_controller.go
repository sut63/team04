package controllers

import (
	"context"
	"fmt"
	"strconv"

	"github.com/B6001186/Contagions/ent"
	"github.com/B6001186/Contagions/ent/severity"
	"github.com/gin-gonic/gin"
)

// SeverityController defines the struct for the severity controller
type SeverityController struct {
	client *ent.Client
	router gin.IRouter
}

// Severity defines the struct for the severity controller
type Severity struct {
	SeverityName string
}

// CreateSeverity handles POST requests for adding severity entities
// @Summary Create severity
// @Description Create severity
// @ID create-severity
// @Accept   json
// @Produce  json
// @Param severity body ent.Severity true "Severity entity"
// @Success 200 {object} ent.Severity
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /severitys [post]
func (ctl *SeverityController) CreateSeverity(c *gin.Context) {
	obj := ent.Severity{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "severity binding failed",
		})
		return
	}

	s, err := ctl.client.Severity.
		Create().
		SetSeverityName(obj.SeverityName).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, s)
}

// GetSeverity handles GET requests to retrieve a severity entity
// @Summary Get a severity entity by ID
// @Description get severity by ID
// @ID get-severity
// @Produce  json
// @Param id path int true "Severity ID"
// @Success 200 {object} ent.Severity
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /severitys/{id} [get]
func (ctl *SeverityController) GetSeverity(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	s, err := ctl.client.Severity.
		Query().
		Where(severity.IDEQ(int(id))).
		Only(context.Background())
	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, s)
}

// ListSeverity handles request to get a list of severity entities
// @Summary List severity entities
// @Description list severity entities
// @ID list-severity
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Severity
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /severitys [get]
func (ctl *SeverityController) ListSeverity(c *gin.Context) {
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

	severitys, err := ctl.client.Severity.
		Query().
		Limit(limit).
		Offset(offset).
		All(context.Background())
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, severitys)
}

// DeleteSeverity handles DELETE requests to delete a severity entity
// @Summary Delete a severity entity by ID
// @Description get severity by ID
// @ID delete-severity
// @Produce  json
// @Param id path int true "Severity ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /severitys/{id} [delete]
func (ctl *SeverityController) DeleteSeverity(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Severity.
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

// UpdateSeverity handles PUT requests to update a severity entity
// @Summary Update a severity entity by ID
// @Description update severity by ID
// @ID update-severity
// @Accept   json
// @Produce  json
// @Param id path int true "Severity ID"
// @Param severity body ent.Severity true "Severity entity"
// @Success 200 {object} ent.Severity
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /severitys/{id} [put]
func (ctl *SeverityController) UpdateSeverity(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.Severity{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "severity binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	u, err := ctl.client.Severity.
		UpdateOneID(int(id)).
		SetSeverityName(obj.SeverityName).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, u)
}

// NewSeverityController creates and registers handles for the severity controller
func NewSeverityController(router gin.IRouter, client *ent.Client) *SeverityController {
	sc := &SeverityController{
		client: client,
		router: router,
	}
	sc.register()
	return sc
}

func (ctl *SeverityController) register() {
	severitys := ctl.router.Group("/severitys")

	severitys.GET("", ctl.ListSeverity)
	// CRUD
	severitys.POST("", ctl.CreateSeverity)
	severitys.GET(":id", ctl.GetSeverity)
	severitys.PUT(":id", ctl.UpdateSeverity)
	severitys.DELETE(":id", ctl.DeleteSeverity)
}
