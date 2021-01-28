// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"

	"github.com/B6001186/Contagions/ent/area"
	"github.com/B6001186/Contagions/ent/diagnosis"
	"github.com/B6001186/Contagions/ent/disease"
	"github.com/B6001186/Contagions/ent/diseasetype"
	"github.com/B6001186/Contagions/ent/drug"
	"github.com/B6001186/Contagions/ent/employee"
	"github.com/B6001186/Contagions/ent/predicate"
	"github.com/B6001186/Contagions/ent/severity"
	"github.com/facebookincubator/ent/dialect/sql"
	"github.com/facebookincubator/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/ent/schema/field"
)

// DiseaseUpdate is the builder for updating Disease entities.
type DiseaseUpdate struct {
	config
	hooks      []Hook
	mutation   *DiseaseMutation
	predicates []predicate.Disease
}

// Where adds a new predicate for the builder.
func (du *DiseaseUpdate) Where(ps ...predicate.Disease) *DiseaseUpdate {
	du.predicates = append(du.predicates, ps...)
	return du
}

// SetDiseaseName sets the DiseaseName field.
func (du *DiseaseUpdate) SetDiseaseName(s string) *DiseaseUpdate {
	du.mutation.SetDiseaseName(s)
	return du
}

// SetSymptom sets the Symptom field.
func (du *DiseaseUpdate) SetSymptom(s string) *DiseaseUpdate {
	du.mutation.SetSymptom(s)
	return du
}

// SetContagion sets the Contagion field.
func (du *DiseaseUpdate) SetContagion(s string) *DiseaseUpdate {
	du.mutation.SetContagion(s)
	return du
}

// SetEmployeeID sets the employee edge to Employee by id.
func (du *DiseaseUpdate) SetEmployeeID(id int) *DiseaseUpdate {
	du.mutation.SetEmployeeID(id)
	return du
}

// SetNillableEmployeeID sets the employee edge to Employee by id if the given value is not nil.
func (du *DiseaseUpdate) SetNillableEmployeeID(id *int) *DiseaseUpdate {
	if id != nil {
		du = du.SetEmployeeID(*id)
	}
	return du
}

// SetEmployee sets the employee edge to Employee.
func (du *DiseaseUpdate) SetEmployee(e *Employee) *DiseaseUpdate {
	return du.SetEmployeeID(e.ID)
}

// SetSeverityID sets the severity edge to Severity by id.
func (du *DiseaseUpdate) SetSeverityID(id int) *DiseaseUpdate {
	du.mutation.SetSeverityID(id)
	return du
}

// SetNillableSeverityID sets the severity edge to Severity by id if the given value is not nil.
func (du *DiseaseUpdate) SetNillableSeverityID(id *int) *DiseaseUpdate {
	if id != nil {
		du = du.SetSeverityID(*id)
	}
	return du
}

// SetSeverity sets the severity edge to Severity.
func (du *DiseaseUpdate) SetSeverity(s *Severity) *DiseaseUpdate {
	return du.SetSeverityID(s.ID)
}

// SetDiseasetypeID sets the diseasetype edge to Diseasetype by id.
func (du *DiseaseUpdate) SetDiseasetypeID(id int) *DiseaseUpdate {
	du.mutation.SetDiseasetypeID(id)
	return du
}

// SetNillableDiseasetypeID sets the diseasetype edge to Diseasetype by id if the given value is not nil.
func (du *DiseaseUpdate) SetNillableDiseasetypeID(id *int) *DiseaseUpdate {
	if id != nil {
		du = du.SetDiseasetypeID(*id)
	}
	return du
}

// SetDiseasetype sets the diseasetype edge to Diseasetype.
func (du *DiseaseUpdate) SetDiseasetype(d *Diseasetype) *DiseaseUpdate {
	return du.SetDiseasetypeID(d.ID)
}

// AddAreaIDs adds the area edge to Area by ids.
func (du *DiseaseUpdate) AddAreaIDs(ids ...int) *DiseaseUpdate {
	du.mutation.AddAreaIDs(ids...)
	return du
}

// AddArea adds the area edges to Area.
func (du *DiseaseUpdate) AddArea(a ...*Area) *DiseaseUpdate {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return du.AddAreaIDs(ids...)
}

// AddDrugIDs adds the drug edge to Drug by ids.
func (du *DiseaseUpdate) AddDrugIDs(ids ...int) *DiseaseUpdate {
	du.mutation.AddDrugIDs(ids...)
	return du
}

// AddDrug adds the drug edges to Drug.
func (du *DiseaseUpdate) AddDrug(d ...*Drug) *DiseaseUpdate {
	ids := make([]int, len(d))
	for i := range d {
		ids[i] = d[i].ID
	}
	return du.AddDrugIDs(ids...)
}

// AddDiagnosiIDs adds the diagnosis edge to Diagnosis by ids.
func (du *DiseaseUpdate) AddDiagnosiIDs(ids ...int) *DiseaseUpdate {
	du.mutation.AddDiagnosiIDs(ids...)
	return du
}

// AddDiagnosis adds the diagnosis edges to Diagnosis.
func (du *DiseaseUpdate) AddDiagnosis(d ...*Diagnosis) *DiseaseUpdate {
	ids := make([]int, len(d))
	for i := range d {
		ids[i] = d[i].ID
	}
	return du.AddDiagnosiIDs(ids...)
}

// Mutation returns the DiseaseMutation object of the builder.
func (du *DiseaseUpdate) Mutation() *DiseaseMutation {
	return du.mutation
}

// ClearEmployee clears the employee edge to Employee.
func (du *DiseaseUpdate) ClearEmployee() *DiseaseUpdate {
	du.mutation.ClearEmployee()
	return du
}

// ClearSeverity clears the severity edge to Severity.
func (du *DiseaseUpdate) ClearSeverity() *DiseaseUpdate {
	du.mutation.ClearSeverity()
	return du
}

// ClearDiseasetype clears the diseasetype edge to Diseasetype.
func (du *DiseaseUpdate) ClearDiseasetype() *DiseaseUpdate {
	du.mutation.ClearDiseasetype()
	return du
}

// RemoveAreaIDs removes the area edge to Area by ids.
func (du *DiseaseUpdate) RemoveAreaIDs(ids ...int) *DiseaseUpdate {
	du.mutation.RemoveAreaIDs(ids...)
	return du
}

// RemoveArea removes area edges to Area.
func (du *DiseaseUpdate) RemoveArea(a ...*Area) *DiseaseUpdate {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return du.RemoveAreaIDs(ids...)
}

// RemoveDrugIDs removes the drug edge to Drug by ids.
func (du *DiseaseUpdate) RemoveDrugIDs(ids ...int) *DiseaseUpdate {
	du.mutation.RemoveDrugIDs(ids...)
	return du
}

// RemoveDrug removes drug edges to Drug.
func (du *DiseaseUpdate) RemoveDrug(d ...*Drug) *DiseaseUpdate {
	ids := make([]int, len(d))
	for i := range d {
		ids[i] = d[i].ID
	}
	return du.RemoveDrugIDs(ids...)
}

// RemoveDiagnosiIDs removes the diagnosis edge to Diagnosis by ids.
func (du *DiseaseUpdate) RemoveDiagnosiIDs(ids ...int) *DiseaseUpdate {
	du.mutation.RemoveDiagnosiIDs(ids...)
	return du
}

// RemoveDiagnosis removes diagnosis edges to Diagnosis.
func (du *DiseaseUpdate) RemoveDiagnosis(d ...*Diagnosis) *DiseaseUpdate {
	ids := make([]int, len(d))
	for i := range d {
		ids[i] = d[i].ID
	}
	return du.RemoveDiagnosiIDs(ids...)
}

// Save executes the query and returns the number of rows/vertices matched by this operation.
func (du *DiseaseUpdate) Save(ctx context.Context) (int, error) {
	if v, ok := du.mutation.DiseaseName(); ok {
		if err := disease.DiseaseNameValidator(v); err != nil {
			return 0, &ValidationError{Name: "DiseaseName", err: fmt.Errorf("ent: validator failed for field \"DiseaseName\": %w", err)}
		}
	}
	if v, ok := du.mutation.Symptom(); ok {
		if err := disease.SymptomValidator(v); err != nil {
			return 0, &ValidationError{Name: "Symptom", err: fmt.Errorf("ent: validator failed for field \"Symptom\": %w", err)}
		}
	}
	if v, ok := du.mutation.Contagion(); ok {
		if err := disease.ContagionValidator(v); err != nil {
			return 0, &ValidationError{Name: "Contagion", err: fmt.Errorf("ent: validator failed for field \"Contagion\": %w", err)}
		}
	}

	var (
		err      error
		affected int
	)
	if len(du.hooks) == 0 {
		affected, err = du.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*DiseaseMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			du.mutation = mutation
			affected, err = du.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(du.hooks) - 1; i >= 0; i-- {
			mut = du.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, du.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (du *DiseaseUpdate) SaveX(ctx context.Context) int {
	affected, err := du.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (du *DiseaseUpdate) Exec(ctx context.Context) error {
	_, err := du.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (du *DiseaseUpdate) ExecX(ctx context.Context) {
	if err := du.Exec(ctx); err != nil {
		panic(err)
	}
}

func (du *DiseaseUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   disease.Table,
			Columns: disease.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: disease.FieldID,
			},
		},
	}
	if ps := du.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := du.mutation.DiseaseName(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: disease.FieldDiseaseName,
		})
	}
	if value, ok := du.mutation.Symptom(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: disease.FieldSymptom,
		})
	}
	if value, ok := du.mutation.Contagion(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: disease.FieldContagion,
		})
	}
	if du.mutation.EmployeeCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.EmployeeTable,
			Columns: []string{disease.EmployeeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: employee.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := du.mutation.EmployeeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.EmployeeTable,
			Columns: []string{disease.EmployeeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: employee.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if du.mutation.SeverityCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.SeverityTable,
			Columns: []string{disease.SeverityColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: severity.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := du.mutation.SeverityIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.SeverityTable,
			Columns: []string{disease.SeverityColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: severity.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if du.mutation.DiseasetypeCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.DiseasetypeTable,
			Columns: []string{disease.DiseasetypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: diseasetype.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := du.mutation.DiseasetypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.DiseasetypeTable,
			Columns: []string{disease.DiseasetypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: diseasetype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if nodes := du.mutation.RemovedAreaIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.AreaTable,
			Columns: []string{disease.AreaColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: area.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := du.mutation.AreaIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.AreaTable,
			Columns: []string{disease.AreaColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: area.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if nodes := du.mutation.RemovedDrugIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.DrugTable,
			Columns: []string{disease.DrugColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: drug.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := du.mutation.DrugIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.DrugTable,
			Columns: []string{disease.DrugColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: drug.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if nodes := du.mutation.RemovedDiagnosisIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.DiagnosisTable,
			Columns: []string{disease.DiagnosisColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: diagnosis.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := du.mutation.DiagnosisIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.DiagnosisTable,
			Columns: []string{disease.DiagnosisColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: diagnosis.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, du.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{disease.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// DiseaseUpdateOne is the builder for updating a single Disease entity.
type DiseaseUpdateOne struct {
	config
	hooks    []Hook
	mutation *DiseaseMutation
}

// SetDiseaseName sets the DiseaseName field.
func (duo *DiseaseUpdateOne) SetDiseaseName(s string) *DiseaseUpdateOne {
	duo.mutation.SetDiseaseName(s)
	return duo
}

// SetSymptom sets the Symptom field.
func (duo *DiseaseUpdateOne) SetSymptom(s string) *DiseaseUpdateOne {
	duo.mutation.SetSymptom(s)
	return duo
}

// SetContagion sets the Contagion field.
func (duo *DiseaseUpdateOne) SetContagion(s string) *DiseaseUpdateOne {
	duo.mutation.SetContagion(s)
	return duo
}

// SetEmployeeID sets the employee edge to Employee by id.
func (duo *DiseaseUpdateOne) SetEmployeeID(id int) *DiseaseUpdateOne {
	duo.mutation.SetEmployeeID(id)
	return duo
}

// SetNillableEmployeeID sets the employee edge to Employee by id if the given value is not nil.
func (duo *DiseaseUpdateOne) SetNillableEmployeeID(id *int) *DiseaseUpdateOne {
	if id != nil {
		duo = duo.SetEmployeeID(*id)
	}
	return duo
}

// SetEmployee sets the employee edge to Employee.
func (duo *DiseaseUpdateOne) SetEmployee(e *Employee) *DiseaseUpdateOne {
	return duo.SetEmployeeID(e.ID)
}

// SetSeverityID sets the severity edge to Severity by id.
func (duo *DiseaseUpdateOne) SetSeverityID(id int) *DiseaseUpdateOne {
	duo.mutation.SetSeverityID(id)
	return duo
}

// SetNillableSeverityID sets the severity edge to Severity by id if the given value is not nil.
func (duo *DiseaseUpdateOne) SetNillableSeverityID(id *int) *DiseaseUpdateOne {
	if id != nil {
		duo = duo.SetSeverityID(*id)
	}
	return duo
}

// SetSeverity sets the severity edge to Severity.
func (duo *DiseaseUpdateOne) SetSeverity(s *Severity) *DiseaseUpdateOne {
	return duo.SetSeverityID(s.ID)
}

// SetDiseasetypeID sets the diseasetype edge to Diseasetype by id.
func (duo *DiseaseUpdateOne) SetDiseasetypeID(id int) *DiseaseUpdateOne {
	duo.mutation.SetDiseasetypeID(id)
	return duo
}

// SetNillableDiseasetypeID sets the diseasetype edge to Diseasetype by id if the given value is not nil.
func (duo *DiseaseUpdateOne) SetNillableDiseasetypeID(id *int) *DiseaseUpdateOne {
	if id != nil {
		duo = duo.SetDiseasetypeID(*id)
	}
	return duo
}

// SetDiseasetype sets the diseasetype edge to Diseasetype.
func (duo *DiseaseUpdateOne) SetDiseasetype(d *Diseasetype) *DiseaseUpdateOne {
	return duo.SetDiseasetypeID(d.ID)
}

// AddAreaIDs adds the area edge to Area by ids.
func (duo *DiseaseUpdateOne) AddAreaIDs(ids ...int) *DiseaseUpdateOne {
	duo.mutation.AddAreaIDs(ids...)
	return duo
}

// AddArea adds the area edges to Area.
func (duo *DiseaseUpdateOne) AddArea(a ...*Area) *DiseaseUpdateOne {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return duo.AddAreaIDs(ids...)
}

// AddDrugIDs adds the drug edge to Drug by ids.
func (duo *DiseaseUpdateOne) AddDrugIDs(ids ...int) *DiseaseUpdateOne {
	duo.mutation.AddDrugIDs(ids...)
	return duo
}

// AddDrug adds the drug edges to Drug.
func (duo *DiseaseUpdateOne) AddDrug(d ...*Drug) *DiseaseUpdateOne {
	ids := make([]int, len(d))
	for i := range d {
		ids[i] = d[i].ID
	}
	return duo.AddDrugIDs(ids...)
}

// AddDiagnosiIDs adds the diagnosis edge to Diagnosis by ids.
func (duo *DiseaseUpdateOne) AddDiagnosiIDs(ids ...int) *DiseaseUpdateOne {
	duo.mutation.AddDiagnosiIDs(ids...)
	return duo
}

// AddDiagnosis adds the diagnosis edges to Diagnosis.
func (duo *DiseaseUpdateOne) AddDiagnosis(d ...*Diagnosis) *DiseaseUpdateOne {
	ids := make([]int, len(d))
	for i := range d {
		ids[i] = d[i].ID
	}
	return duo.AddDiagnosiIDs(ids...)
}

// Mutation returns the DiseaseMutation object of the builder.
func (duo *DiseaseUpdateOne) Mutation() *DiseaseMutation {
	return duo.mutation
}

// ClearEmployee clears the employee edge to Employee.
func (duo *DiseaseUpdateOne) ClearEmployee() *DiseaseUpdateOne {
	duo.mutation.ClearEmployee()
	return duo
}

// ClearSeverity clears the severity edge to Severity.
func (duo *DiseaseUpdateOne) ClearSeverity() *DiseaseUpdateOne {
	duo.mutation.ClearSeverity()
	return duo
}

// ClearDiseasetype clears the diseasetype edge to Diseasetype.
func (duo *DiseaseUpdateOne) ClearDiseasetype() *DiseaseUpdateOne {
	duo.mutation.ClearDiseasetype()
	return duo
}

// RemoveAreaIDs removes the area edge to Area by ids.
func (duo *DiseaseUpdateOne) RemoveAreaIDs(ids ...int) *DiseaseUpdateOne {
	duo.mutation.RemoveAreaIDs(ids...)
	return duo
}

// RemoveArea removes area edges to Area.
func (duo *DiseaseUpdateOne) RemoveArea(a ...*Area) *DiseaseUpdateOne {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return duo.RemoveAreaIDs(ids...)
}

// RemoveDrugIDs removes the drug edge to Drug by ids.
func (duo *DiseaseUpdateOne) RemoveDrugIDs(ids ...int) *DiseaseUpdateOne {
	duo.mutation.RemoveDrugIDs(ids...)
	return duo
}

// RemoveDrug removes drug edges to Drug.
func (duo *DiseaseUpdateOne) RemoveDrug(d ...*Drug) *DiseaseUpdateOne {
	ids := make([]int, len(d))
	for i := range d {
		ids[i] = d[i].ID
	}
	return duo.RemoveDrugIDs(ids...)
}

// RemoveDiagnosiIDs removes the diagnosis edge to Diagnosis by ids.
func (duo *DiseaseUpdateOne) RemoveDiagnosiIDs(ids ...int) *DiseaseUpdateOne {
	duo.mutation.RemoveDiagnosiIDs(ids...)
	return duo
}

// RemoveDiagnosis removes diagnosis edges to Diagnosis.
func (duo *DiseaseUpdateOne) RemoveDiagnosis(d ...*Diagnosis) *DiseaseUpdateOne {
	ids := make([]int, len(d))
	for i := range d {
		ids[i] = d[i].ID
	}
	return duo.RemoveDiagnosiIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (duo *DiseaseUpdateOne) Save(ctx context.Context) (*Disease, error) {
	if v, ok := duo.mutation.DiseaseName(); ok {
		if err := disease.DiseaseNameValidator(v); err != nil {
			return nil, &ValidationError{Name: "DiseaseName", err: fmt.Errorf("ent: validator failed for field \"DiseaseName\": %w", err)}
		}
	}
	if v, ok := duo.mutation.Symptom(); ok {
		if err := disease.SymptomValidator(v); err != nil {
			return nil, &ValidationError{Name: "Symptom", err: fmt.Errorf("ent: validator failed for field \"Symptom\": %w", err)}
		}
	}
	if v, ok := duo.mutation.Contagion(); ok {
		if err := disease.ContagionValidator(v); err != nil {
			return nil, &ValidationError{Name: "Contagion", err: fmt.Errorf("ent: validator failed for field \"Contagion\": %w", err)}
		}
	}

	var (
		err  error
		node *Disease
	)
	if len(duo.hooks) == 0 {
		node, err = duo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*DiseaseMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			duo.mutation = mutation
			node, err = duo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(duo.hooks) - 1; i >= 0; i-- {
			mut = duo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, duo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (duo *DiseaseUpdateOne) SaveX(ctx context.Context) *Disease {
	d, err := duo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return d
}

// Exec executes the query on the entity.
func (duo *DiseaseUpdateOne) Exec(ctx context.Context) error {
	_, err := duo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (duo *DiseaseUpdateOne) ExecX(ctx context.Context) {
	if err := duo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (duo *DiseaseUpdateOne) sqlSave(ctx context.Context) (d *Disease, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   disease.Table,
			Columns: disease.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: disease.FieldID,
			},
		},
	}
	id, ok := duo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing Disease.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := duo.mutation.DiseaseName(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: disease.FieldDiseaseName,
		})
	}
	if value, ok := duo.mutation.Symptom(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: disease.FieldSymptom,
		})
	}
	if value, ok := duo.mutation.Contagion(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: disease.FieldContagion,
		})
	}
	if duo.mutation.EmployeeCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.EmployeeTable,
			Columns: []string{disease.EmployeeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: employee.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := duo.mutation.EmployeeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.EmployeeTable,
			Columns: []string{disease.EmployeeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: employee.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if duo.mutation.SeverityCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.SeverityTable,
			Columns: []string{disease.SeverityColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: severity.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := duo.mutation.SeverityIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.SeverityTable,
			Columns: []string{disease.SeverityColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: severity.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if duo.mutation.DiseasetypeCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.DiseasetypeTable,
			Columns: []string{disease.DiseasetypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: diseasetype.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := duo.mutation.DiseasetypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   disease.DiseasetypeTable,
			Columns: []string{disease.DiseasetypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: diseasetype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if nodes := duo.mutation.RemovedAreaIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.AreaTable,
			Columns: []string{disease.AreaColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: area.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := duo.mutation.AreaIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.AreaTable,
			Columns: []string{disease.AreaColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: area.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if nodes := duo.mutation.RemovedDrugIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.DrugTable,
			Columns: []string{disease.DrugColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: drug.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := duo.mutation.DrugIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.DrugTable,
			Columns: []string{disease.DrugColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: drug.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if nodes := duo.mutation.RemovedDiagnosisIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.DiagnosisTable,
			Columns: []string{disease.DiagnosisColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: diagnosis.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := duo.mutation.DiagnosisIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   disease.DiagnosisTable,
			Columns: []string{disease.DiagnosisColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: diagnosis.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	d = &Disease{config: duo.config}
	_spec.Assign = d.assignValues
	_spec.ScanValues = d.scanValues()
	if err = sqlgraph.UpdateNode(ctx, duo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{disease.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return d, nil
}
