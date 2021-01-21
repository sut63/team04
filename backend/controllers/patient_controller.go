package controllers

import (
	"context"
	"fmt"
	"strconv"

	"github.com/B6001186/Contagions/ent"
	"github.com/B6001186/Contagions/ent/bloodtype"
	"github.com/B6001186/Contagions/ent/employee"
	"github.com/B6001186/Contagions/ent/gender"
	"github.com/B6001186/Contagions/ent/nametitle"
	"github.com/B6001186/Contagions/ent/category"
	"github.com/gin-gonic/gin"
)

// PatientController defines the struct for the patient controller
type PatientController struct {
	client *ent.Client
	router gin.IRouter
}

// Patient  defines the struct for the patient controller
type Patient struct {
	Idcard     string
	Category     int
	PatientName       string
	Nametitle  int
	Gender     int
	Bloodtype  int
	Address    string
	Congenital string
	Allergic   string
	Employee   int
}

// CreatePatient handles POST requests for adding patient entities
// @Summary Create patient
// @Description Create patient
// @ID create-patient
// @Accept   json
// @Produce  json
// @Param patient body ent.Patient true "Patient entity"
// @Success 200 {object} ent.Patient
// @Failure 400 {object} gin.H.
// @Failure 500 {object} gin.H
// @Router /patients [post]
func (ctl *PatientController) CreatePatient(c *gin.Context) {
	obj := Patient{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "patient binding failed",
		})
		return
	}

	ct, err := ctl.client.Category.
		Query().
		Where(category.IDEQ(int(obj.Category))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "Category not found",
		})
		return
	}

	n, err := ctl.client.Nametitle.
		Query().
		Where(nametitle.IDEQ(int(obj.Nametitle))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "nametitle not found",
		})
		return
	}

	g, err := ctl.client.Gender.
		Query().
		Where(gender.IDEQ(int(obj.Gender))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "gender not found",
		})
		return
	}

	b, err := ctl.client.Bloodtype.
		Query().
		Where(bloodtype.IDEQ(int(obj.Bloodtype))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "bloodtype not found",
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

	pa, err := ctl.client.Patient.
		Create().
		SetIdcard(obj.Idcard).
		SetCategory(ct).
		SetNametitle(n).
		SetPatientName(obj.PatientName).
		SetGender(g).
		SetBloodtype(b).
		SetAddress(obj.Address).
		SetCongenital(obj.Congenital).
		SetAllergic(obj.Allergic).
		SetEmployee(e).
		Save(context.Background())

		if err != nil {
			fmt.Println(err)
			c.JSON(400, gin.H{
				"status": false,
				"error":  err,
			})
			return
		}
	
		c.JSON(200, gin.H{
			"status": true,
			"data":   pa,
		})
	}

// ListPatient handles request to get a list of patient entities
// @Summary List patient entities
// @Description list patient entities
// @ID list-patient
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Patient
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /patients [get]
func (ctl *PatientController) ListPatient(c *gin.Context) {
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

	patients, err := ctl.client.Patient.
		Query().
		WithCategory().
		WithNametitle().
		WithGender().
		WithBloodtype().
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

	c.JSON(200, patients)
}

// DeletePatient handles DELETE requests to delete a patient entity
// @Summary Delete a patient entity by ID
// @Description get patient by ID
// @ID delete-patient
// @Produce  json
// @Param id path int true "Patient ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /patients/{id} [delete]
func (ctl *PatientController) DeletePatient(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Patient.
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

// UpdatePatient handles PUT requests to update a patient entity
// @Summary Update a patient entity by ID
// @Description update patient by ID
// @ID update-patient
// @Accept   json
// @Produce  json
// @Param id path int true "Patient ID"
// @Param patienttype body ent.Patient true "Patient entity"
// @Success 200 {object} ent.Patient
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /patients/{id} [put]
func (ctl *PatientController) UpdatePatient(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.Patient{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "patienttype binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	p, err := ctl.client.Patient.
		UpdateOneID(int(id)).
		SetPatientName(obj.PatientName).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, p)
}

// NewPatientController creates and registers handles for the patient controller
func NewPatientController(router gin.IRouter, client *ent.Client) *PatientController {
	pc := &PatientController{
		client: client,
		router: router,
	}
	pc.register()
	return pc
}

func (ctl *PatientController) register() {
	patients := ctl.router.Group("/patients")
	patients.POST("", ctl.CreatePatient)
	patients.GET("", ctl.ListPatient)
	patients.PUT("id", ctl.UpdatePatient)
	patients.DELETE("id", ctl.ListPatient)

}
