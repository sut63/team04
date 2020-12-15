package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
)

// examine holds the schema definition for the examine entity.
type Examine struct {
	ent.Schema
}

// Fields of the examine.
func (Examine) Fields() []ent.Field {
	return []ent.Field{
		field.Time("date"),
		field.String("info").Unique(),
	}
}

// Edges of the examine.
func (Examine) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("patient", Patient.Type).Ref("examine").Unique(),
		edge.From("disease", Disease.Type).Ref("examine").Unique(),
	}
}
