package schema

import (
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// Diagnosis schema.
type Diagnosis struct {
	ent.Schema
}

// Fields of the Diagnosis.
func (Diagnosis) Fields() []ent.Field {
	return []ent.Field{
		field.String("DiagnosticMessages"),
		field.String("SurveillancePeriod"),
		field.String("DiagnosisDate"),
	}
}

// Edges of the Diagnosis.
func (Diagnosis) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("disease", Disease.Type).Ref("diagnosis").Unique(),
	}
}
