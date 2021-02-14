package schema

import (
	"errors"
	"regexp"

	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// Disease schema
type Disease struct {
	ent.Schema
}

//Fields of the Disease
func (Disease) Fields() []ent.Field {
	return []ent.Field{

		field.String("DiseaseName").Validate(func(s string) error{
            match, _ := regexp.MatchString("[โรค]",s)
            if !match {
                return errors.New("รูปแบบโรคไม่ถูกต้อง")
            }
                return nil
		}),
		field.String("Symptom").Validate(func(s string) error{
            match, _ := regexp.MatchString("^[ก-๙]",s)
            if !match {
                return errors.New("รูปแบบอาการไม่ถูกต้องกรุณาป้อนเป็นตัวอักษร")
            }
                return nil
		}),
		field.String("Contagion").Validate(func(s string) error{
            match, _ := regexp.MatchString("^[ก-๙]",s)
            if !match {
                return errors.New("รูปแบบการแพร่กระจายไม่ถูกต้องกรุณาป้อนเป็นตัวอักษร")
            }
                return nil
		}),

	}
}

// Edges of the Disease.
func (Disease) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("employee", Employee.Type).Ref("disease").Unique(),
		edge.From("severity", Severity.Type).Ref("disease").Unique(),
		edge.From("diseasetype", Diseasetype.Type).Ref("disease").Unique(),
		edge.To("area", Area.Type),
		edge.To("drug", Drug.Type),
		edge.To("diagnosis", Diagnosis.Type),
	}
}
