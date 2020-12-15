package schema

import (
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// NameTitle schema.
type NameTitle struct {
	ent.Schema
}

// Fields of the NameTitle.
func (NameTitle) Fields() []ent.Field {
	return []ent.Field{
		field.String("Name"),
	}
}

// Edges of the NameTitle.
func (NameTitle) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("patient", Patient.Type),
		
	}
}
