// Code generated by entc, DO NOT EDIT.

package disease

const (
	// Label holds the string label denoting the disease type in the database.
	Label = "disease"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldDiseaseName holds the string denoting the diseasename field in the database.
	FieldDiseaseName = "disease_name"
	// FieldSymptom holds the string denoting the symptom field in the database.
	FieldSymptom = "symptom"
	// FieldContagion holds the string denoting the contagion field in the database.
	FieldContagion = "contagion"

	// EdgeEmployee holds the string denoting the employee edge name in mutations.
	EdgeEmployee = "employee"
	// EdgeSeverity holds the string denoting the severity edge name in mutations.
	EdgeSeverity = "severity"
	// EdgeDiseasetype holds the string denoting the diseasetype edge name in mutations.
	EdgeDiseasetype = "diseasetype"
	// EdgeArea holds the string denoting the area edge name in mutations.
	EdgeArea = "area"
	// EdgeDrug holds the string denoting the drug edge name in mutations.
	EdgeDrug = "drug"
	// EdgeDiagnosis holds the string denoting the diagnosis edge name in mutations.
	EdgeDiagnosis = "diagnosis"

	// Table holds the table name of the disease in the database.
	Table = "diseases"
	// EmployeeTable is the table the holds the employee relation/edge.
	EmployeeTable = "diseases"
	// EmployeeInverseTable is the table name for the Employee entity.
	// It exists in this package in order to avoid circular dependency with the "employee" package.
	EmployeeInverseTable = "employees"
	// EmployeeColumn is the table column denoting the employee relation/edge.
	EmployeeColumn = "employee_disease"
	// SeverityTable is the table the holds the severity relation/edge.
	SeverityTable = "diseases"
	// SeverityInverseTable is the table name for the Severity entity.
	// It exists in this package in order to avoid circular dependency with the "severity" package.
	SeverityInverseTable = "severities"
	// SeverityColumn is the table column denoting the severity relation/edge.
	SeverityColumn = "severity_disease"
	// DiseasetypeTable is the table the holds the diseasetype relation/edge.
	DiseasetypeTable = "diseases"
	// DiseasetypeInverseTable is the table name for the Diseasetype entity.
	// It exists in this package in order to avoid circular dependency with the "diseasetype" package.
	DiseasetypeInverseTable = "diseasetypes"
	// DiseasetypeColumn is the table column denoting the diseasetype relation/edge.
	DiseasetypeColumn = "diseasetype_disease"
	// AreaTable is the table the holds the area relation/edge.
	AreaTable = "areas"
	// AreaInverseTable is the table name for the Area entity.
	// It exists in this package in order to avoid circular dependency with the "area" package.
	AreaInverseTable = "areas"
	// AreaColumn is the table column denoting the area relation/edge.
	AreaColumn = "disease_area"
	// DrugTable is the table the holds the drug relation/edge.
	DrugTable = "drugs"
	// DrugInverseTable is the table name for the Drug entity.
	// It exists in this package in order to avoid circular dependency with the "drug" package.
	DrugInverseTable = "drugs"
	// DrugColumn is the table column denoting the drug relation/edge.
	DrugColumn = "disease_drug"
	// DiagnosisTable is the table the holds the diagnosis relation/edge.
	DiagnosisTable = "diagnoses"
	// DiagnosisInverseTable is the table name for the Diagnosis entity.
	// It exists in this package in order to avoid circular dependency with the "diagnosis" package.
	DiagnosisInverseTable = "diagnoses"
	// DiagnosisColumn is the table column denoting the diagnosis relation/edge.
	DiagnosisColumn = "disease_diagnosis"
)

// Columns holds all SQL columns for disease fields.
var Columns = []string{
	FieldID,
	FieldDiseaseName,
	FieldSymptom,
	FieldContagion,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the Disease type.
var ForeignKeys = []string{
	"diseasetype_disease",
	"employee_disease",
	"severity_disease",
}
