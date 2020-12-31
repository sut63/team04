package controllers
 
import (
   "context"
   "fmt"
   "strconv"
   "github.com/nutzann/app/ent"
   "github.com/nutzann/app/ent/statistic"
   "github.com/gin-gonic/gin"
)
// StatisticController defines the struct for the statistic controller 
type StatisticController struct {
   client *ent.Client
   router gin.IRouter
}
// Statistic defines the struct for the statistic controller
type Statistic struct {
	StatisticName     string

}
// CreateStatistic handles POST requests for adding statistic entities
// @Summary Create statistic
// @Description Create statistic
// @ID create-statistic
// @Accept   json
// @Produce  json
// @Param statistic body ent.Statistic true "Statistic entity"
// @Success 200 {object} ent.Statistic
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /statistics [post]
func (ctl *StatisticController) CreateStatistic(c *gin.Context) {
	obj := ent.Statistic{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "statistic binding failed",
		})
		return
	}
  
	st, err := ctl.client.Statistic.
		Create().
		SetName(obj.Name).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}
  
	c.JSON(200, st)
 }
// GetStatistic handles GET requests to retrieve a statistic entity
// @Summary Get a statistic entity by ID
// @Description get statistic by ID
// @ID get-statistic
// @Produce  json
// @Param id path int true "Statistic ID"
// @Success 200 {object} ent.Statistic
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /statistics/{id} [get]
func (ctl *StatisticController) GetStatistic(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
  
	st, err := ctl.client.Statistic.
		Query().
		Where(statistic.IDEQ(int(id))).
		Only(context.Background())
	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}
  
	c.JSON(200, st)
 }
// ListStatistic handles request to get a list of statistic entities
// @Summary List statistic entities
// @Description list statistic entities
// @ID list-statistic
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Statistic
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /statistics [get]
func (ctl *StatisticController) ListStatistic(c *gin.Context) {
	limitQuery := c.Query("limit")
	limit := 10
	if limitQuery != "" {
		limit64, err := strconv.ParseInt(limitQuery, 10, 64)
		if err == nil {limit = int(limit64)}
	}
  
	offsetQuery := c.Query("offset")
	offset := 0
	if offsetQuery != "" {
		offset64, err := strconv.ParseInt(offsetQuery, 10, 64)
		if err == nil {offset = int(offset64)}
	}
  
	statistics, err := ctl.client.Statistic.
		Query().
		Limit(limit).
		Offset(offset).
		All(context.Background())
		if err != nil {
		c.JSON(400, gin.H{"error": err.Error(),})
		return
	}
  
	c.JSON(200, statistics)
 }
// DeleteStatistic handles DELETE requests to delete a statistic entity
// @Summary Delete a statistic entity by ID
// @Description get statistic by ID
// @ID delete-statistic
// @Produce  json
// @Param id path int true "Statistic ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /statistics/{id} [delete]
func (ctl *StatisticController) DeleteStatistic(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
  
	err = ctl.client.Statistic.
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
 
// UpdateStatistic handles PUT requests to update a statistic entity
// @Summary Update a statistic entity by ID
// @Description update statistic by ID
// @ID update-statistic
// @Accept   json
// @Produce  json
// @Param id path int true "Statistic ID"
// @Param statistic body ent.Statistic true "Statistic entity"
// @Success 200 {object} ent.Statistic
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /statistics/{id} [put]
func (ctl *StatisticController) UpdateStatistic(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
  
	obj := ent.Statistic{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "statistic binding failed",
		})
		return
	}
	obj.ID = int(id)
	st, err := ctl.client.Statistic.
		UpdateOne(&obj).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{"error": "update failed",})
		return
	}
  
	c.JSON(200, st)
 }
// NewStatisticController creates and registers handles for the statistic controller
func NewStatisticController(router gin.IRouter, client *ent.Client) *StatisticController {
	stc := &StatisticController{
		client: client,
		router: router,
	}
	stc.register()
	return stc
 }
  
 // InitStatisticController registers routes to the main engine
 func (ctl *StatisticController) register() {
	statistics := ctl.router.Group("/statistics")
  
	statistics.GET("", ctl.ListStatistic)
  
	// CRUD
	statistics.POST("", ctl.CreateStatistic)
	statistics.GET(":id", ctl.GetStatistic)
	statistics.DELETE(":id", ctl.DeleteStatistic)
	statistics.PUT(":id", ctl.UpdateStatistic)
	
 }
 
 
 