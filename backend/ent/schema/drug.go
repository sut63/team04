package schema

import (
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
		field.String("name").Unique(),
		field.String("howto").Unique(),
		field.String("property").Unique(),
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
