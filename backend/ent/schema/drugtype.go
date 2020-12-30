package schema

import (
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// DrugType holds the schema definition for the DrugType entity.
type DrugType struct {
	ent.Schema
}

// Fields of the DrugType.
func (DrugType) Fields() []ent.Field {
	return []ent.Field{
		field.String("DrugTypeName").Unique(),
	}
}

// Edges of the DrugType.
func (DrugType) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("drug", Drug.Type),
	}
}
