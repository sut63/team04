package schema

import (
	"regexp"
	"errors"
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// Employee holds the schema definition for the Employee entity.
type Employee struct {
	ent.Schema
}

// Fields of the Employee.
func (Employee) Fields() []ent.Field {
	return []ent.Field{
		field.String("UserId").Validate(func(s string) error{
			match, _ := regexp.MatchString("[N,M,E,MR,P]\\d{5}",s)
			if !match {
				return errors.New("รูปแบบรหัสพนักงานไม่ถูกต้อง")
			}
				return nil
		}),
		field.String("EmployeeName").NotEmpty(),
		field.String("Tel").MaxLen(10).MinLen(10),
		field.Time("BirthdayDate"),
		field.String("Email").Validate(func(s string) error{
			match, _ := regexp.MatchString("^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",s)
			if !match {
				return errors.New("รูปแบบอีเมลไม่ถูกต้อง")
			}
				return nil
		}),
		field.String("Password").NotEmpty(),
			}
}

// Edges of the Employee.
func (Employee) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("department", Department.Type).Ref("employee").Unique(),
		edge.From("place", Place.Type).Ref("employee").Unique(),
		edge.From("nametitle", Nametitle.Type).Ref("employee").Unique(),
		edge.To("area", Area.Type),
		edge.To("disease", Disease.Type),
		edge.To("drug", Drug.Type),
		edge.To("diagnosis", Diagnosis.Type),
		edge.To("patient", Patient.Type),
	}
}