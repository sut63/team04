package schema
 
import (
   "github.com/facebookincubator/ent"
   "github.com/facebookincubator/ent/schema/field"
   "github.com/facebookincubator/ent/schema/edge"
)
 
// Area schema. 
type Area struct {
   ent.Schema
}
 
// Fields of the Area.
func (Area) Fields() []ent.Field {
   return []ent.Field{
       field.String("name"),
   }
}
 
// Edges of the Area.
func (Area) Edges() []ent.Edge {
   return []ent.Edge{
	   edge.From("disease",Disease.Type).Ref("area").Unique(),
	   edge.From("statistic",Statistic.Type).Ref("area").Unique(),
      edge.From("level",Level.Type).Ref("area").Unique(),
      edge.From("employee",Employee.Type).Ref("area").Unique(),
   }
}
