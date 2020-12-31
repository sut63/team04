package controllers

import (
	"fmt"
	"context"
	"strconv"

	"github.com/B6001186/Contagions/ent"
	"github.com/B6001186/Contagions/ent/diagnosis"
	"github.com/gin-gonic/gin"
)

// DiagnosisController defines the struct for the diagnosis controller
type DiagnosisController struct {
	client *ent.Client
	router gin.IRouter
}

// Diagnosis defines the struct for the diagnosis controller
type Diagnosis struct {
	Name string
}

// CreateDiagnosis handles POST requests for adding diagnosis entities
// @Summary Create diagnosis
// @Description Create diagnosis
// @ID create-diagnosis
// @Accept   json
// @Produce  json
// @Param diagnosis body ent.Diagnosis true "Diagnosis entity"
// @Success 200 {object} ent.Diagnosis
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /diagnosiss [post]
func (ctl *DiagnosisController) CreateDiagnosis(c *gin.Context) {
	obj := ent.Diagnosis{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "diagnosis binding failed",
		})
		return
	}

	d, err := ctl.client.Diagnosis.
		Create().
		SetDiagnosticMessages(obj.DiagnosticMessages).

		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, d)
}

// GetDiagnosis handles GET requests to retrieve a diagnosis entity
// @Summary Get a diagnosis entity by ID
// @Description get diagnosis by ID
// @ID get-diagnosis
// @Produce  json
// @Param id path int true "Diagnosis ID"
// @Success 200 {object} ent.Diagnosis
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /diagnosiss/{id} [get]
func (ctl *DiagnosisController) GetDiagnosis(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	d, err := ctl.client.Diagnosis.
		Query().
		Where(diagnosis.IDEQ(int(id))).
		Only(context.Background())
	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, d)
}

// ListDiagnosis handles request to get a list of diagnosis entities
// @Summary List diagnosis entities
// @Description list diagnosis entities
// @ID list-diagnosis
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Diagnosis
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /diagnosiss [get]
func (ctl *DiagnosisController) ListDiagnosis(c *gin.Context) {
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

	diagnosiss, err := ctl.client.Diagnosis.
		Query().
		Limit(limit).
		Offset(offset).
		All(context.Background())
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, diagnosiss)
}

// DeleteDiagnosis handles DELETE requests to delete a diagnosis entity
// @Summary Delete a diagnosis entity by ID
// @Description get diagnosis by ID
// @ID delete-diagnosis
// @Produce  json
// @Param id path int true "Diagnosis ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /diagnosiss/{id} [delete]
func (ctl *DiagnosisController) DeleteDiagnosis(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Diagnosis.
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

// UpdateDiagnosis handles PUT requests to update a diagnosis entity
// @Summary Update a diagnosis entity by ID
// @Description update diagnosis by ID
// @ID update-diagnosis
// @Accept   json
// @Produce  json
// @Param id path int true "Diagnosis ID"
// @Param diagnosistype body ent.Diagnosis true "Diagnosis entity"
// @Success 200 {object} ent.Diagnosis
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /diagnosiss/{id} [put]
func (ctl *DiagnosisController) UpdateDiagnosis(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.Diagnosis{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "diagnosis binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	d, err := ctl.client.Diagnosis.
		UpdateOneID(int(id)).
		SetDiagnosticMessages(obj.DiagnosticMessages).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, d)
}


// NewDiagnosisController creates and registers handles for the diagnosis controller
func NewDiagnosisController(router gin.IRouter, client *ent.Client) *DiagnosisController {
	dc := &DiagnosisController{
		client: client,
		router: router,
	}
	dc.register()
	return dc
}

func (ctl *DiagnosisController) register() {
	diagnosiss := ctl.router.Group("/diagnosiss")

	diagnosiss.GET("", ctl.ListDiagnosis)
	diagnosiss.POST("", ctl.CreateDiagnosis)
	diagnosiss.GET(":id", ctl.GetDiagnosis)
	diagnosiss.PUT("id", ctl.UpdateDiagnosis)
	diagnosiss.DELETE(":id", ctl.DeleteDiagnosis)
}