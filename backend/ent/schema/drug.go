package schema

import (
	"errors"
	"regexp"

	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// Drug holds the schema definition for the Drug entity.
type Drug struct {
	ent.Schema
}

// Fields of the Drug.
func (Drug) Fields() []ent.Field {
	return []ent.Field{
		field.String("drugname").
			Validate(func(s string) error {
				match, _ := regexp.MatchString("[ยา]", s)
				if !match {
					return errors.New("รูปแบบชื่อยาไม่ถูกต้อง")
				}
				return nil
			}).
			NotEmpty(),

		field.String("howto").
			Validate(func(s string) error {
				match, _ := regexp.MatchString("[ปริมาณ]", s)
				if !match {
					return errors.New("รูปแบบวิธีการใช้ไม่ถูกต้อง")
				}
				return nil
			}).NotEmpty(),

		field.String("property").
			Validate(func(s string) error {
				match, _ := regexp.MatchString("[รักษา]", s)
				if !match {
					return errors.New("รูปแบบสรรพคุณไม่ถูกต้อง")
				}
				return nil
			}).
			NotEmpty(),
	}
}

// Edges of the Drug.
func (Drug) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("employee", Employee.Type).Ref("drug").Unique(),
		edge.From("drugtype", DrugType.Type).Ref("drug").Unique(),
		edge.From("disease", Disease.Type).Ref("drug").Unique(),
	}
}
