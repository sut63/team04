package schema

import (
	"github.com/facebookincubator/ent"
	"github.com/facebookincubator/ent/schema/edge"
	"github.com/facebookincubator/ent/schema/field"
)

// Employee holds the schema definition for the Employee entity.
type Employee struct {
	ent.Schema
}

// Fields of the Employee.
func (Employee) Fields() []ent.Field {
	return []ent.Field{
		field.String("User_id"),
		field.String("Name"),
		field.String("Tel"),
		field.String("Email"),
		field.Time("BirthdayDate"),
		field.Time("AttendTime"),
		field.Time("FinishTime"),
			}
}

// Edges of the Employee.
func (Employee) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("department", Department.Type).Ref("employee").Unique(),
		edge.From("place", Place.Type).Ref("employee").Unique(),
		edge.From("titlename", Titlename.Type).Ref("employee").Unique(),
	}
}
