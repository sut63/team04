package schema

import (
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// Bloodtype schema.
type Bloodtype struct {
	ent.Schema
}

// Fields of the Bloodtype.
func (Bloodtype) Fields() []ent.Field {
	return []ent.Field{
		field.String("Name"),
	}
}

// Edges of the Bloodtype.
func (Bloodtype) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("patient", Patient.Type),
	}
}
