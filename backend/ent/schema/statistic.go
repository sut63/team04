package schema

import (
 "github.com/facebookincubator/ent"
 "github.com/facebookincubator/ent/schema/edge"
 "github.com/facebookincubator/ent/schema/field"
)

// Statistic holds the schema definition for the Statistic entity.
type Statistic struct {
 ent.Schema
}

// Fields of the Statistic.
func (Statistic) Fields() []ent.Field {
 return []ent.Field{
 field.String("StatisticName").Unique(),
 }
}

// Edges of the Statistic.
func (Statistic) Edges() []ent.Edge {
 return []ent.Edge{
 edge.To("area", Area.Type),
 }
}