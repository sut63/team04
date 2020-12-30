package controllers

import (
	"context"
	"strconv"
	"fmt"

	"github.com/B6001186/Contagions/ent"
	"github.com/B6001186/Contagions/ent/place"
	"github.com/gin-gonic/gin"
)

// PlaceController defines the struct for the place controller
type PlaceController struct {
	client *ent.Client
	router gin.IRouter
}

// Place defines the struct for the place controller
type Place struct {
	PlaceName string
}

// CreatePlace handles POST requests for adding place entities
// @Summary Create place
// @Description Create place
// @ID create-place
// @Accept   json
// @Produce  json
// @Param place body ent.Place true "Place entity"
// @Success 200 {object} ent.Place
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /places [post]
func (ctl *PlaceController) CreatePlace(c *gin.Context) {
	obj := ent.Place{}
	if err := c.ShouldBind(&obj); err != nil {
		c.JSON(400, gin.H{
			"error": "place binding failed",
		})
		return
	}

	p, err := ctl.client.Place.
		Create().
		SetPlaceName(obj.PlaceName).
		Save(context.Background())

	if err != nil {
		c.JSON(400, gin.H{
			"error": "saving failed",
		})
		return
	}

	c.JSON(200, p)
}

// GetPlace handles GET requests to retrieve a place entity
// @Summary Get a place entity by ID
// @Description get place by ID
// @ID get-place
// @Produce  json
// @Param id path int true "Place ID"
// @Success 200 {object} ent.Place
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /places/{id} [get]
func (ctl *PlaceController) GetPlace(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	p, err := ctl.client.Place.
		Query().
		Where(place.IDEQ(int(id))).
		Only(context.Background())

	if err != nil {
		c.JSON(404, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, p)
}

// ListPlace handles request to get a list of place entities
// @Summary List place entities
// @Description list place entities
// @ID list-place
// @Produce json
// @Param limit  query int false "Limit"
// @Param offset query int false "Offset"
// @Success 200 {array} ent.Place
// @Failure 400 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /places [get]
func (ctl *PlaceController) ListPlace(c *gin.Context) {
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

	places, err := ctl.client.Place.
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

	c.JSON(200, places)
}

// DeletePlace handles DELETE requests to delete a place entity
// @Summary Delete a place entity by ID
// @Description get place by ID
// @ID delete-place
// @Produce  json
// @Param id path int true "Place ID"
// @Success 200 {object} gin.H
// @Failure 400 {object} gin.H
// @Failure 404 {object} gin.H
// @Failure 500 {object} gin.H
// @Router /places/{id} [delete]
func (ctl *PlaceController) DeletePlace(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = ctl.client.Place.
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



// NewPlaceController creates and registers handles for the place controller
func NewPlaceController(router gin.IRouter, client *ent.Client) *PlaceController {
	pc := &PlaceController{
		client: client,
		router: router,
	}

	pc.register()

	return pc

}

// InitPlaceController registers routes to the main engine
func (ctl *PlaceController) register() {
	places := ctl.router.Group("/places")

	places.GET("", ctl.ListPlace)
	places.POST("", ctl.CreatePlace)
	places.GET(":id", ctl.GetPlace)
	places.DELETE(":id", ctl.DeletePlace)

}
