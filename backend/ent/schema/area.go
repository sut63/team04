package schema
 
import (
   "regexp"
   "errors"
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
      field.String("AreaName").Validate(func(s string) error{
         match, _ := regexp.MatchString("^[ก-ฮ]",s)
         if !match {
             return errors.New("รูปแบบชื่อสถานที่ไม่ถูกต้อง")
         }
             return nil
     }),
     field.String("AreaDistrict").Validate(func(s string) error{
      match, _ := regexp.MatchString("^[ก-ฮ]",s)
      if !match {
          return errors.New("รูปแบบชื่ออำเภอไม่ถูกต้อง")
      }
          return nil
      }),
      field.String("AreaSubDistrict").Validate(func(s string) error{
       match, _ := regexp.MatchString("^[ก-ฮ]",s)
       if !match {
         return errors.New("รูปแบบชื่อตำบลไม่ถูกต้อง")
      }
          return nil
}),
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
