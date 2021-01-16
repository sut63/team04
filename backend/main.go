package main

import (
	"context"
	"log"

	"github.com/B6001186/Contagions/controllers"
	_ "github.com/B6001186/Contagions/docs"
	"github.com/B6001186/Contagions/ent"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// DrugTypes  defines the struct for the drugTypes
type DrugTypes struct {
	DrugType []DrugType
}

// DrugType  defines the struct for the drugType
type DrugType struct {
	DrugTypeName string
}

// Departments  defines the struct for the departments
type Departments struct {
	Department []Department
}

// Department  defines the struct for the department
type Department struct {
	DepartmentName string
}

// Places  defines the struct for the places
type Places struct {
	Place []Place
}

// Place  defines the struct for the place
type Place struct {
	PlaceName string
}

// Nametitles  defines the struct for the Nametitles
type Nametitles struct {
	Nametitle []Nametitle
}

// Nametitle  defines the struct for the Nametitle
type Nametitle struct {
	title string
}

// Employees  defines the struct for the employees
type Employees struct {
	Employee []Employee
}

// Employee  defines the struct for the employee
type Employee struct {
	UserID       string
}

// Categorys  defines the struct for the categorys
type Categorys struct {
	Category []Category
}

// Category  defines the struct for the  category
type Category struct {
	CategoryName string
}

// Genders  defines the struct for the genders
type Genders struct {
	Gender []Gender
}

// Gender  defines the struct for the gender
type Gender struct {
	GenderName string
}

// Bloodtypes  defines the struct for the bloodtypes
type Bloodtypes struct {
	Bloodtype []Bloodtype
}

// Bloodtype  defines the struct for the bloodtype
type Bloodtype struct {
	BloodtypeName string
}

// Patients  defines the struct for the Patients
type Patients struct {
	Patient []Patient
}

// Patient  defines the struct for the Patient
type Patient struct {
	Idcard string
	Congenital  string
	Allergic    string
}

// Diseases  defines the struct for the diseases
type Diseases struct {
	Disease []Disease
}

// Disease  defines the struct for the Disease
type Disease struct {
	DiseaseName string
}

// Diseasetypes  defines the struct for the diseasetypes
type Diseasetypes struct {
	Diseasetype []Diseasetype
}

// Diseasetype  defines the struct for the diseasetype
type Diseasetype struct {
	DiseaseTypeName string
}

// Severitys  defines the struct for the severitys
type Severitys struct {
	Severity []Severity
}

// Severity  defines the struct for the severity
type Severity struct {
	SeverityName string
}

// Levels  defines the struct for the level
type Levels struct {
	Level []Level
}

// Level  defines the struct for the  levels
type Level struct {
	LevelName string
}

// Statistics defines the struct for the statistic
type Statistics struct {
	Statistic []Statistic
}

// Statistic  defines the struct for the  statistics
type Statistic struct {
	StatisticName string
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

	client, err := ent.Open("sqlite3", "file:contagions.db?&cache=shared&_fk=1")
	if err != nil {
		log.Fatalf("fail to open sqlite3: %v", err)
	}
	defer client.Close()

	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	v1 := router.Group("/api/v1")
	controllers.NewAreaController(v1, client)
	controllers.NewPatientController(v1, client)
	controllers.NewBloodtypeController(v1, client)
	controllers.NewEmployeeController(v1, client)
	controllers.NewGenderController(v1, client)
	controllers.NewCategoryController(v1, client)
	controllers.NewNametitleController(v1, client)
	controllers.NewDepartmentController(v1, client)
	controllers.NewPlaceController(v1, client)
	controllers.NewDiseaseController(v1, client)
	controllers.NewDiseasetypeController(v1, client)
	controllers.NewSeverityController(v1, client)
	controllers.NewDrugTypeController(v1, client)
	controllers.NewDrugController(v1, client)
	controllers.NewLevelController(v1, client)
	controllers.NewStatisticController(v1, client)

	// Set Employees Data
	employees := Employees{
		Employee: []Employee{
			Employee{"N12345"},
			Employee{"M12345"},
			Employee{"E12345"},
			Employee{"MR12345"},
			Employee{"P12345"},
		},
	}

	for _, e := range employees.Employee {
		client.Employee.
			Create().
			SetUserId(e.UserID).
			Save(context.Background())
	}

	// Set Categorys Data
	categorys := Categorys{
		Category: []Category{
			Category{"นักเรียน"},
			Category{"นักศึกษา"},
			Category{"บุคลากร"},
			Category{"บุคคลทั่วไป"},
	 	},
	}

	for _, ct := range categorys.Category {
	 	client.Category.
	 		Create().
			SetCategoryName(ct.CategoryName).
	 		Save(context.Background())
	}

	// Set Nametitles Data
	nametitles := Nametitles{
		Nametitle: []Nametitle{
			Nametitle{"เด็กชาย"},
			Nametitle{"เด็กหญิง"},
			Nametitle{"นาย"},
			Nametitle{"นาง"},
			Nametitle{"นางสาว"},
			Nametitle{"นพ."},
			Nametitle{"พญ."},
			Nametitle{"พย."},
			Nametitle{"พยช."},
			Nametitle{"อื่น ๆ"},
		},
	}

	for _, n := range nametitles.Nametitle {
		client.Nametitle.
			Create().
			SetTitle(n.title).
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
			SetGenderName(g.GenderName).
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
			SetBloodtypeName(b.BloodtypeName).
			Save(context.Background())
	}

	// Set Departments Data
	departments := Departments{
		Department: []Department{
			Department{"แพทย์"},
			Department{"เภสัชกร"},
			Department{"เจ้าหน้าที่เวชระเบียน"},
			Department{"แพทย์ระบาดวิทยา"},
			Department{"พยาบาล"},
		},
	}

	for _, d := range departments.Department {
		client.Department.
			Create().
			SetDepartmentName(d.DepartmentName).
			Save(context.Background())
	}

	// Set Places Data
	places := Places{
		Place: []Place{
			Place{"ตึก A"},
			Place{"ตึก B"},
			Place{"ตึก C"},
			Place{"ตึก D"},
			Place{"ตึก E"},
		},
	}

	for _, p := range places.Place {
		client.Place.
			Create().
			SetPlaceName(p.PlaceName).
			Save(context.Background())
	}

	// Set Diseases Data
	diseases := Diseases{
		Disease: []Disease{
			Disease{"โควิด-19"},
			Disease{"เอดส์"},
			Disease{"ไข้เลือดออก"},
			Disease{"ตาแดง"},
			Disease{"วัณโรค"},
		},
	}

	for _, d := range diseases.Disease {
		client.Disease.
			Create().
			SetDiseaseName(d.DiseaseName).
			Save(context.Background())
	}

	// Set Patients Data
	patients := Patients{
		Patient: []Patient{
			Patient{"1200000000001", "เบาหวาน", "ความดัน"},
			Patient{"1200000000002", "อ้วน", "โรคหัวใจ"},
			Patient{"1200000000003", "ไม่มี", "โรคหัวใจ"},
			Patient{"1200000000004", "ไม่มี", "ไม่มี"},
			Patient{"1200000000005", "ไม่มี", "ภูมิแพ้"},
		},
	}

	for _, pa := range patients.Patient {
		client.Patient.
			Create().
			SetIdcard(pa.Idcard).
			SetCongenital(pa.Congenital).
			SetAllergic(pa.Allergic).
			Save(context.Background())
	}

	// Set Diseasetypes Data
	diseasetypes := Diseasetypes{
		Diseasetype: []Diseasetype{
			Diseasetype{"โรคติดต่อ"},
			Diseasetype{"โรคติดต่อต้องแจ้งความ"},
			Diseasetype{"โรคติดต่ออันตราย"},
		},
	}

	for _, dt := range diseasetypes.Diseasetype {
		client.Diseasetype.
			Create().
			SetDiseaseTypeName(dt.DiseaseTypeName).
			Save(context.Background())
	}

	// Set Severity Data
	severitys := Severitys{
		Severity: []Severity{
			Severity{"เริ่มต้น"},
			Severity{"รุนแรง"},
			Severity{"รุนแรงมาก"},
		},
	}

	for _, s := range severitys.Severity {
		client.Severity.
			Create().
			SetSeverityName(s.SeverityName).
			Save(context.Background())
	}

	// Set drugtype Data
	drugtypes := DrugTypes{
		DrugType: []DrugType{
			DrugType{"ยาเม็ด"},
			DrugType{"ยาน้ำ"},
			DrugType{"วัคซีน"},
		},
	}
	for _, dte := range drugtypes.DrugType {
		client.DrugType.
			Create().
			SetDrugTypeName(dte.DrugTypeName).
			Save(context.Background())
	}

	// Set Levels Data
	levels := Levels{
		Level: []Level{
			Level{"ความเสี่ยงระดับต่ำ"},
			Level{"ความเสี่ยงระดับกลาง"},
			Level{"ความเสี่ยงระดับสูง"},
		},
	}

	for _, l := range levels.Level {
		client.Level.
			Create().
			SetLevelName(l.LevelName).
			Save(context.Background())
	}
	// Set Statistics Data
	statistics := Statistics{
		Statistic: []Statistic{
			Statistic{"ประชากรติดจำนวนน้อยมาก"},
			Statistic{"ประชากรติดจำนวนน้อย"},
			Statistic{"ประชากรติดจำนวนปานกลาง"},
			Statistic{"ประชากรติดจำนวนมาก"},
			Statistic{"ประชากรติดจำนวนมากที่สุด"},
		},
	}

	for _, st := range statistics.Statistic {
		client.Statistic.
			Create().
			SetStatisticName(st.StatisticName).
			Save(context.Background())
	}

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.Run()
}
