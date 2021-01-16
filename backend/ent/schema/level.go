package schema

import (
 "github.com/facebookincubator/ent"
 "github.com/facebookincubator/ent/schema/edge"
 "github.com/facebookincubator/ent/schema/field"
)

// Level holds the schema definition for the Level entity.
type Level struct {
 ent.Schema
}

// Fields of the Level.
func (Level) Fields() []ent.Field {
 return []ent.Field{
 field.String("LevelName").Unique(),
 }
}

// Edges of the Level.
func (Level) Edges() []ent.Edge {
 return []ent.Edge{
 edge.To("area", Area.Type),
 }

}