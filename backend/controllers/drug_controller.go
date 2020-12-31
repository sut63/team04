package controllers

import (
	"context"
	"fmt"

	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/B6001186/Contagions/ent"
	"github.com/B6001186/Contagions/ent/disease"
	"github.com/B6001186/Contagions/ent/drugtype"
	"github.com/B6001186/Contagions/ent/employee"
)

// DrugController defines the struct for the drug controller
type DrugController struct {
	client *ent.Client
	router gin.IRouter
}

// Drug defines the struct for the drug
type Drug struct {
	DrugType int
	Disease  int
	Employee int
	DrugName string
	Howto    string
	Property string
}

// CreateDrug handles POST requests for adding drug entities
// @Summary Create drug
// @Description Create drug
// @ID create-drug
// @Accept   json
// @Produce  json
// @Param drug body ent.Drug true "Drug entity"
// @Success 200 {object} ent.Drug
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /drugs [post]
func (ctl *DrugController) CreateDrug(c *gin.Context) {
	obj := Drug{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "drug  binding failed",
		})
		return
	}

	dt, err := ctl.client.DrugType.
		Query().
		Where(drugtype.IDEQ(int(obj.DrugType))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "drugtype not found",
		})
		return
	}

	di, err := ctl.client.Disease.
		Query().
		Where(disease.IDEQ(int(obj.Disease))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "disease not found",
		})
		return
	}

	e, err := ctl.client.Employee.
		Query().
		Where(employee.IDEQ(int(obj.Employee))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "employee not found",
		})
		return
	}

	d, err := ctl.client.Drug.
		Create().
		SetDisease(di).
		SetDrugtype(dt).
		SetEmployee(e).
		SetDrugName(obj.DrugName).
		SetHowto(obj.Howto).
		SetProperty(obj.Property).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, gin.H{
		"status": true,
		"data":   d,
	})
}

// ListDrug handles request to get a list of drug entities
// @Summary List drug entities
// @Description list drug entities
// @ID list-drug
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Drug
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /drugs [get]
func (ctl *DrugController) ListDrug(c *gin.Context) {
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

	drugs, err := ctl.client.Drug.
		Query().
		WithDrugtype().
		WithDisease().
		WithEmployee().
		Limit(limit).
		Offset(offset).
		All(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, drugs)
}

// DeleteDrug handles DELETE requests to delete a drug entity
// @Summary Delete a drug entity by ID
// @Description get drug by ID
// @ID delete-drug
// @Produce  json
// @Param id path int true "Drug ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /drugs/{id} [delete]
func (ctl *DrugController) DeleteDrug(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Drug.
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

// UpdateDrug handles PUT requests to update a drug entity
// @Summary Update a drug entity by ID
// @Description update drug by ID
// @ID update-drug
// @Accept   json
// @Produce  json
// @Param id path int true "Drug ID"
// @Param drugtype body ent.Drug true "Drug entity"
// @Success 200 {object} ent.Drug
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /drugs/{id} [put]
func (ctl *DrugController) UpdateDrug(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.Drug{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "drugtype binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	u, err := ctl.client.Drug.
		UpdateOneID(int(id)).
		SetDrugName(obj.DrugName).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, u)
}

// NewDrugController creates and registers handles for the drug controller
func NewDrugController(router gin.IRouter, client *ent.Client) *DrugController {
	dc := &DrugController{
		client: client,
		router: router,
	}

	dc.register()

	return dc

}

func (ctl *DrugController) register() {
	drugs := ctl.router.Group("/drugs")

	drugs.POST("", ctl.CreateDrug)
	drugs.GET("", ctl.ListDrug)
	drugs.PUT(":id", ctl.UpdateDrug)
	drugs.DELETE(":id", ctl.DeleteDrug)

}
