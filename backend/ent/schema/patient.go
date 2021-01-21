package schema

import (
	"errors"
	"regexp"
	
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// Patient schema.
type Patient struct {
	ent.Schema
}

// Fields of the Patient.
func (Patient) Fields() []ent.Field {
	return []ent.Field{
		field.String("Idcard").MaxLen(13).MinLen(13),
		field.String("PatientName").NotEmpty(),
		field.String("Address").NotEmpty(),
		field.String("Congenital").Validate(func(s string) error {
			match, _ := regexp.MatchString("[โรค, ไม่มี,-]", s)
			if !match {
				return errors.New("รูปแบบโรคประจำไม่ถูกต้อง")
			}
			return nil
		}),
		field.String("Allergic").Validate(func(s string) error {
			match, _ := regexp.MatchString("[ตัวยาชื่อ, ไม่มี, -, ยา]", s)
			if !match {
				return errors.New("รูปแบบประวัติแพ้ยาไม่ถูกต้อง")
			}
			return nil
		}),
	}
}

// Edges of the Patient.
func (Patient) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("employee", Employee.Type).Ref("patient").Unique(),
		edge.From("category", Category.Type).Ref("patient").Unique(),
		edge.From("bloodtype", Bloodtype.Type).Ref("patient").Unique(),
		edge.From("gender", Gender.Type).Ref("patient").Unique(),
		edge.From("nametitle", Nametitle.Type).Ref("patient").Unique(),
		edge.To("diagnosis", Diagnosis.Type),		
	}
}