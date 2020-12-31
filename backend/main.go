package main

import (
	"context"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"

	"github.com/Sujitnapa21/app/controllers"
	"github.com/Sujitnapa21/app/ent"
)

// Employees  defines the struct for the employees
type Employees struct {
	Employee []Employee
}

// Employee  defines the struct for the employee
type Employee struct {
	UserID string
}

// Statuss  defines the struct for the statuss
type Statuss struct {
	Status []Status
}

// Status  defines the struct for the  status
type Status struct {
	Name string
}

// NameTitles  defines the struct for the nametitles
type NameTitles struct {
	NameTitle []NameTitle
}

// NameTitle  defines the struct for the nametitle
type NameTitle struct {
	Name string
}

// Genders  defines the struct for the genders
type Genders struct {
	Gender []Gender
}

// Gender  defines the struct for the gender
type Gender struct {
	Name string
}

// Bloodtypes  defines the struct for the bloodtypes
type Bloodtypes struct {
	Bloodtype []Bloodtype
}

// Bloodtype  defines the struct for the bloodtype
type Bloodtype struct {
	Name string
}

// @title SUT SA Example API Patient
// @version 1.0
// @description This is a sample server for SUT SE 2563
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /api/v1

// @securityDefinitions.basic BasicAuth

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization

// @securitydefinitions.oauth2.application OAuth2Application
// @tokenUrl https://example.com/oauth/token
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.implicit OAuth2Implicit
// @authorizationUrl https://example.com/oauth/authorize
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.password OAuth2Password
// @tokenUrl https://example.com/oauth/token
// @scope.read Grants read access
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.accessCode OAuth2AccessCode
// @tokenUrl https://example.com/oauth/token
// @authorizationUrl https://example.com/oauth/authorize
// @scope.admin Grants read and write access to administrative information

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	client, err := ent.Open("sqlite3", "file:contagion.db?&cache=shared&_fk=1")
	if err != nil {
		log.Fatalf("fail to open sqlite3: %v", err)
	}
	defer client.Close()

	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	v1 := router.Group("/api/v1")
	controllers.NewPatientController(v1, client)
	controllers.NewBloodtypeController(v1, client)
	controllers.NewEmployeeController(v1, client)
	controllers.NewGenderController(v1, client)
	controllers.NewStatusController(v1, client)
	controllers.NewNameTitleController(v1, client)

	// Set Employees Data
	employees := Employees{
		Employee: []Employee{
			Employee{"D12345"},
			Employee{"D54231"},
		},
	}

	for _, e := range employees.Employee {
		client.Employee.
			Create().
			SetUserID(e.UserID).
			Save(context.Background())
	}

	// Set Statuss Data
	statuss := Statuss{
		Status: []Status{
			Status{"นักเรียน"},
			Status{"นักศึกษา"},
			Status{"บุคลากร"},
			Status{"บุคคลทั่วไป"},
		},
	}

	for _, s := range statuss.Status {
		client.Status.
			Create().
			SetName(s.Name).
			Save(context.Background())
	}

	// Set NameTitles Data
	nametitles := NameTitles{
		NameTitle: []NameTitle{
			NameTitle{"เด็กชาย"},
			NameTitle{"เด็กหญิง"},
			NameTitle{"นาย"},
			NameTitle{"นาง"},
			NameTitle{"นางสาว"},
		},
	}

	for _, n := range nametitles.NameTitle {
		client.NameTitle.
			Create().
			SetName(n.Name).
			Save(context.Background())
	}

	// Set Genders Data
	genders := Genders{
		Gender: []Gender{
			Gender{"ชาย"},
			Gender{"หญิง"},
		},
	}

	for _, g := range genders.Gender {
		client.Gender.
			Create().
			SetName(g.Name).
			Save(context.Background())
	}

	// Set Bloodtypes Data
	bloodtypes := Bloodtypes{
		Bloodtype: []Bloodtype{
			Bloodtype{"A"},
			Bloodtype{"B"},
			Bloodtype{"O"},
			Bloodtype{"AB"},
		},
	}

	for _, b := range bloodtypes.Bloodtype {
		client.Bloodtype.
			Create().
			SetName(b.Name).
			Save(context.Background())
	}

	//router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.Run()
}
