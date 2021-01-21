package schema

import (
	"regexp"
	"errors"

	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"

)

// Diagnosis holds the schema definition for the Diagnosis entity.
type Diagnosis struct {
	ent.Schema
}

// Fields of the Diagnosis.
func (Diagnosis) Fields() []ent.Field {
	return []ent.Field{
		field.String("DiagnosticMessages").
		Validate(func(s string) error {
			match1, _ := regexp.MatchString("พบ.*", s)
				if !match1 {
					return errors.New("รูปแบบการวินิจฉัยไม่ถูกต้อง")
				}
	
			return nil
		}).
		NotEmpty(),
		
		field.String("SurveillancePeriod").
		Validate(func(s string) error {
			match1, _ := regexp.MatchString("เฝ้าระวัง.*", s)
				if !match1 {
					return errors.New("รูปแบบการเฝ้าระวังไม่ถูกต้อง")
				}
			return nil
		}).
		NotEmpty(),

		field.String("Treatment").
		Validate(func(s string) error {
			match1, _ := regexp.MatchString("แผน.*", s)
				if !match1 {
					return errors.New("รูปแบบการรักษาไม่ถูกต้อง")
				}
			return nil
		}).
		NotEmpty(),

		field.Time("DiagnosisDate"),
	}
}

// Edges of the Diagnosis.
func (Diagnosis) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("disease", Disease.Type).Ref("diagnosis").Unique(),
		edge.From("patient", Patient.Type).Ref("diagnosis").Unique(),
		edge.From("employee", Employee.Type).Ref("diagnosis").Unique(),
	}
}
