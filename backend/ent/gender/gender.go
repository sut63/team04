// Code generated by entc, DO NOT EDIT.

package gender

const (
	// Label holds the string label denoting the gender type in the database.
	Label = "gender"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldGenderName holds the string denoting the gendername field in the database.
	FieldGenderName = "gender_name"

	// EdgePatient holds the string denoting the patient edge name in mutations.
	EdgePatient = "patient"

	// Table holds the table name of the gender in the database.
	Table = "genders"
	// PatientTable is the table the holds the patient relation/edge.
	PatientTable = "patients"
	// PatientInverseTable is the table name for the Patient entity.
	// It exists in this package in order to avoid circular dependency with the "patient" package.
	PatientInverseTable = "patients"
	// PatientColumn is the table column denoting the patient relation/edge.
	PatientColumn = "gender_patient"
)

// Columns holds all SQL columns for gender fields.
var Columns = []string{
	FieldID,
	FieldGenderName,
}