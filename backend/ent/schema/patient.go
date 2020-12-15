package schema

import (
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
		field.String("Idcard"),
		field.String("Name"),
		field.String("Address"),
		field.String("Congenital"),
		field.String("Allergic"),
	}
}

// Edges of the Patient.
func (Patient) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("employee", Employee.Type).Ref("patient").Unique(),
		edge.From("status", Status.Type).Ref("patient").Unique(),
		edge.From("bloodtype", Bloodtype.Type).Ref("patient").Unique(),
		edge.From("gender", Gender.Type).Ref("patient").Unique(),
		edge.From("nametitle", NameTitle.Type).Ref("patient").Unique(),
	}
}
