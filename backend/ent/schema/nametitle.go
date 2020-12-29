package schema

import (
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// Titlename holds the schema definition for the Titlename entity.
type Titlename struct {
	ent.Schema
}

// Fields of the Titlename.
func (Titlename) Fields() []ent.Field {
	return []ent.Field{
		field.String("Title").Unique(),
	}
}

// Edges of the Titlename.
func (Titlename) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("employee", Employee.Type),
	}
}
