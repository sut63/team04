package schema

import (

    "github.com/facebookincubator/ent"
    "github.com/facebookincubator/ent/schema/field"
    "github.com/facebookincubator/ent/schema/edge"
)

// Severity schema
type Severity struct {
    ent.Schema
}

//Fields of the Severity
func (Severity) Fields() []ent.Field {
    return []ent.Field{
        field.String("SeverityName ").Unique(),

    }
}

// Edges of the Severity.
func (Severity) Edges() []ent.Edge {
    return []ent.Edge{
        edge.To("disease", Disease.Type),

    }
}

