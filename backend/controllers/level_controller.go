package controllers
 
import (
   "context"
   "fmt"
   "strconv"
   "github.com/nutzann/app/ent"
   "github.com/nutzann/app/ent/level"
   "github.com/gin-gonic/gin"
)
// LevelController defines the struct for the level controller 
type LevelController struct {
   client *ent.Client
   router gin.IRouter
}
// Level defines the struct for the level controller
type Level struct {
	LevelName     string
	
}
// CreateLevel handles POST requests for adding level entities
// @Summary Create level
// @Description Create level
// @ID create-level
// @Accept   json
// @Produce  json
// @Param level body ent.Level true "Level entity"
// @Success 200 {object} ent.Level
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /levels [post]
func (ctl *LevelController) CreateLevel(c *gin.Context) {
	obj := ent.Level{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "level binding failed",
		})
		return
	}
  
	l, err := ctl.client.Level.
		Create().
		SetName(obj.Name).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}
  
	c.JSON(200, l)
}
// GetLevel handles GET requests to retrieve a level entity
// @Summary Get a level entity by ID
// @Description get level by ID
// @ID get-level
// @Produce  json
// @Param id path int true "Level ID"
// @Success 200 {object} ent.Level
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /levels/{id} [get]
func (ctl *LevelController) GetLevel(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	l, err := ctl.client.Level.
		Query().
		Where(level.IDEQ(int(id))).
		Only(context.Background())

	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, l)
}

// ListLevel handles request to get a list of level entities
// @Summary List level entities
// @Description list level entities
// @ID list-level
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Level
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /levels [get]
func (ctl *LevelController) ListLevel(c *gin.Context) {
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
  
	levels, err := ctl.client.Level.
		Query().
		Limit(limit).
		Offset(offset).
		All(context.Background())
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error(),
		})
		return
	}
	c.JSON(200, levels)
 }
// DeleteLevel handles DELETE requests to delete a level entity
// @Summary Delete a level entity by ID
// @Description get level by ID
// @ID delete-level
// @Produce  json
// @Param id path int true "Level ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /levels/{id} [delete] 
func (ctl *LevelController) DeleteLevel(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
  
	err = ctl.client.Level.
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
// UpdateLevel handles PUT requests to update a level entity
// @Summary Update a level entity by ID
// @Description update level by ID
// @ID update-level
// @Accept   json
// @Produce  json
// @Param id path int true "Level ID"
// @Param level body ent.Level true "Level entity"
// @Success 200 {object} ent.Level
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /levels/{id} [put]
func (ctl *LevelController) UpdateLevel(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
  
	obj := ent.Level{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "level binding failed",
		})
		return
	}
	obj.ID = int(id)
	l, err := ctl.client.Level.
		UpdateOne(&obj).
		Save(context.Background())
	if err != nil {
		c.JSON(400, gin.H{"error": "update failed",})
		return
	}
  
	c.JSON(200, l)
 }
// NewLevelController creates and registers handles for the level controller
func NewLevelController(router gin.IRouter, client *ent.Client) *LevelController {
	lc := &LevelController{
		client: client,
		router: router,
	}
	lc.register()
	return lc
 }
  

// InitLevelController registers routes to the main engine 
 func (ctl *LevelController) register() {
	levels := ctl.router.Group("/levels")
  
	levels.GET("", ctl.ListLevel)
  
	// CRUD
	levels.POST("", ctl.CreateLevel)
	levels.GET(":id", ctl.GetLevel)
	levels.DELETE(":id", ctl.DeleteLevel)
	levels.PUT(":id", ctl.UpdateLevel)
	
 }
 
 
 