package schema

import (
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// Diseasetype schema
type Diseasetype struct {
	ent.Schema
}

//Fields of the Diseasetype
func (Diseasetype) Fields() []ent.Field {
	return []ent.Field{
		field.String("DiseaseTypeName ").Unique(),
	}
}

// Edges of the Diseasetype.
func (Diseasetype) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("disease", Disease.Type),
	}
}
