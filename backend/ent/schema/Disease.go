package schema

import (
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
		field.String("Name"),
		field.String("Symptom"),
		field.String("Contagion"),
	}
}

// Edges of the Disease.
func (Disease) Edges() []ent.Edge {
	return []ent.Edge{

		edge.From("employee", Employee.Type).Ref("disease").Unique(),
		edge.From("severity", Severity.Type).Ref("disease").Unique(),
		edge.From("diseasetype", Diseasetype.Type).Ref("disease").Unique(),
	}
}
