package controllers
 
import (
   "context"
   "fmt"
   "strconv"
   "github.com/B6001186/Contagions/ent"
   "github.com/B6001186/Contagions/ent/disease"
   "github.com/B6001186/Contagions/ent/employee"
   "github.com/B6001186/Contagions/ent/level"
   "github.com/B6001186/Contagions/ent/statistic"
   "github.com/gin-gonic/gin"
)
 
// AreaController defines the struct for the area controller
type AreaController struct {
   client *ent.Client
   router gin.IRouter
}
// Area  defines the struct for the area controller
type Area struct {
	AreaName 	string
	AreaDistrict 		string
	AreaSubDistrict 	string
	Level 		int
	Statistic 	int
	Disease   	int
	Employee   	int
	
}

// CreateArea handles POST requests for adding area entities
// @Summary Create area
// @Description Create area
// @ID create-area
// @Accept   json
// @Produce  json
// @Param area body ent.Area true "Area entity"
// @Success 200 {object} ent.Area
// @Failure 400 {object} gin.H.
// @Failure 500 {object} gin.H
// @Router /areas [post]
func (ctl *AreaController) CreateArea(c *gin.Context) {
	obj := Area{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "area binding failed",
		})
		return
	}
  
	l, err := ctl.client.Level.
			Query().
			Where(level.IDEQ(int(obj.Level))).
			Only(context.Background())

	if err != nil {
			c.JSON(400, gin.H{
					"error": "level not found",
			})
			return
	}
	st, err := ctl.client.Statistic.
			Query().
			Where(statistic.IDEQ(int(obj.Statistic))).
			Only(context.Background())

	if err != nil {
			c.JSON(400, gin.H{
					"error": "statistic not found",
			})
			return
	}
	d, err := ctl.client.Disease.
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
	a, err := ctl.client.Area.
			Create().
			SetAreaName(obj.AreaName).
			SetAreaDistrict(obj.AreaDistrict).
			SetAreaSubDistrict(obj.AreaSubDistrict).
			SetLevel(l).
			SetStatistic(st).
			SetDisease(d).
			SetEmployee(e).
			Save(context.Background())

			if err != nil {
				fmt.Println(err)
				c.JSON(400, gin.H{
					"status": false,
					"error": err,
				})
				return
			}
		
			c.JSON(200, gin.H{
				"status": true,
				"data": a,
			})
}
 
// ListArea handles request to get a list of area entities
// @Summary List area entities
// @Description list area entities
// @ID list-area
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Area
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /areas [get]
func (ctl *AreaController) ListArea(c *gin.Context) {
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

	areas, err := ctl.client.Area.
		Query().
		WithLevel().
		WithStatistic().
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

	c.JSON(200, areas)
}
// DeleteArea handles DELETE requests to delete a area entity
// @Summary Delete a area entity by ID
// @Description get area by ID
// @ID delete-area
// @Produce  json
// @Param id path int true "Area ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /areas/{id} [delete]
func (ctl *AreaController) DeleteArea(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Area.
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

// NewAreaController creates and registers handles for the area controller
func NewAreaController(router gin.IRouter, client *ent.Client) *AreaController {
	ac := &AreaController{
		client: client,
		router: router,
	}
	ac.register()
	return ac
 }
  
 
 func (ctl *AreaController) register() {
	areas := ctl.router.Group("/areas")

	areas.POST("", ctl.CreateArea)
	areas.GET("", ctl.ListArea)
	areas.DELETE(":id", ctl.DeleteArea)
 }
 
 
 