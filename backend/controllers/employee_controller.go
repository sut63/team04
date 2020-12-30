package controllers

import (
	"log"
	"context"
	"strconv"
	"fmt"
	"time"

	"github.com/B6001186/Contagions/ent"
	"github.com/B6001186/Contagions/ent/department"
	"github.com/B6001186/Contagions/ent/place"
	"github.com/B6001186/Contagions/ent/nametitle"
	"github.com/gin-gonic/gin"
)

// EmployeeController defines the struct for the employee controller
type EmployeeController struct {
	client *ent.Client
	router gin.IRouter
}

// Employee  defines the struct for the employee controller
type Employee struct {
	Place        int
	Namtitle     int
	Department   int
	UserId       string
	EmployeeName         string
	Tel          string
	Email        string
	BirthdayDate string
	Password	 string
}

// CreateEmployee handles POST requests for adding employee entities
// @Summary Create employee
// @Description Create employee
// @ID create-employee
// @Accept   json
// @Produce  json
// @Param employee body ent.Employee true "Employee entity"
// @Success 200 {object} ent.Employee
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /employees [post]
func (ctl *EmployeeController) CreateEmployee(c *gin.Context) {
	obj := Employee{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "employee binding failed",
		})
		return
	}

	p, err := ctl.client.Place.
		Query().
		Where(place.IDEQ(int(obj.Place))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "place not found",
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

	d, err := ctl.client.Department.
		Query().
		Where(department.IDEQ(int(obj.Department))).
		Only(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "department not found",
		})
		return
	}
	
	birthday, err := time.Parse(time.RFC3339, obj.BirthdayDate + "T00:00:00Z")

	if err != nil {
		log.Fatal(err)
	}

	e, err := ctl.client.Employee.
		Create().
		SetUserId(obj.UserId).
		SetEmployeeName(obj.EmployeeName).
		SetTel(obj.Tel).
		SetEmail(obj.Email).
		SetBirthdayDate(birthday).
		SetPassword(obj.Password).
		SetNametitle(n).
		SetDepartment(d).
		SetPlace(p).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving employee failed",
		})
		return
	}

	c.JSON(200, e)
}

// ListEmployee handles request to get a list of employee entities
// @Summary List employee entities
// @Description list employee entities
// @ID list-employee
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Employee
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /employees [get]
func (ctl *EmployeeController) ListEmployee(c *gin.Context) {
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

	employees, err := ctl.client.Employee.
		Query().
		WithPlace().
		WithTitlename().
		WithDepartment().
		Limit(limit).
		Offset(offset).
		All(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, employees)
}

// DeleteEmployee handles DELETE requests to delete a employee entity
// @Summary Delete a employee entity by ID
// @Description get employee by ID
// @ID delete-employee
// @Produce  json
// @Param id path int true "Employee ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /employees/{id} [delete]
func (ctl *EmployeeController) DeleteEmployee(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Employee.
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

// UpdateEmployee handles PUT requests to update a employee entity
// @Summary Update a employee entity by ID
// @Description update employee by ID
// @ID update-employee
// @Accept   json
// @Produce  json
// @Param id path int true "Employee ID"
// @Param employee body ent.Employee true "Employee entity"
// @Success 200 {object} ent.Employee
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /employees/{id} [put]
func (ctl *EmployeeController) UpdateEmployee(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	obj := ent.Employee{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "employee binding failed",
		})
		return
	}
	obj.ID = int(id)
	fmt.Println(obj.ID)
	u, err := ctl.client.Employee.
		UpdateOneID(int(id)).
		SetUserId(obj.UserId).
		SetEmployeeName(obj.EmployeeName).
		SetTel(obj.Tel).
		SetEmail(obj.Email).
		SetPassword(obj.Password).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "update failed",
		})
		return
	}

	c.JSON(200, u)
}

// NewEmployeeController creates and registers handles for the department controller
func NewEmployeeController(router gin.IRouter, client *ent.Client) *EmployeeController {
	ec := &EmployeeController{
		client: client,
		router: router,
	}

	ec.register()

	return ec

}

// InitEmployeeController registers routes to the main engine
func (ctl *EmployeeController) register() {
	employees := ctl.router.Group("/employees")
	employees.GET("", ctl.ListEmployee)
	employees.POST("", ctl.CreateEmployee)
	employees.PUT(":id", ctl.UpdateEmployee)
	employees.DELETE(":id", ctl.DeleteEmployee)
}
