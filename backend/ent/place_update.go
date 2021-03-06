// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"

	"github.com/B6001186/Contagions/ent/employee"
	"github.com/B6001186/Contagions/ent/place"
	"github.com/B6001186/Contagions/ent/predicate"
	"github.com/facebookincubator/ent/dialect/sql"
	"github.com/facebookincubator/ent/dialect/sql/sqlgraph"
	"github.com/facebookincubator/ent/schema/field"
)

// PlaceUpdate is the builder for updating Place entities.
type PlaceUpdate struct {
	config
	hooks      []Hook
	mutation   *PlaceMutation
	predicates []predicate.Place
}

// Where adds a new predicate for the builder.
func (pu *PlaceUpdate) Where(ps ...predicate.Place) *PlaceUpdate {
	pu.predicates = append(pu.predicates, ps...)
	return pu
}

// SetPlaceName sets the PlaceName field.
func (pu *PlaceUpdate) SetPlaceName(s string) *PlaceUpdate {
	pu.mutation.SetPlaceName(s)
	return pu
}

// AddEmployeeIDs adds the employee edge to Employee by ids.
func (pu *PlaceUpdate) AddEmployeeIDs(ids ...int) *PlaceUpdate {
	pu.mutation.AddEmployeeIDs(ids...)
	return pu
}

// AddEmployee adds the employee edges to Employee.
func (pu *PlaceUpdate) AddEmployee(e ...*Employee) *PlaceUpdate {
	ids := make([]int, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return pu.AddEmployeeIDs(ids...)
}

// Mutation returns the PlaceMutation object of the builder.
func (pu *PlaceUpdate) Mutation() *PlaceMutation {
	return pu.mutation
}

// RemoveEmployeeIDs removes the employee edge to Employee by ids.
func (pu *PlaceUpdate) RemoveEmployeeIDs(ids ...int) *PlaceUpdate {
	pu.mutation.RemoveEmployeeIDs(ids...)
	return pu
}

// RemoveEmployee removes employee edges to Employee.
func (pu *PlaceUpdate) RemoveEmployee(e ...*Employee) *PlaceUpdate {
	ids := make([]int, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return pu.RemoveEmployeeIDs(ids...)
}

// Save executes the query and returns the number of rows/vertices matched by this operation.
func (pu *PlaceUpdate) Save(ctx context.Context) (int, error) {

	var (
		err      error
		affected int
	)
	if len(pu.hooks) == 0 {
		affected, err = pu.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*PlaceMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			pu.mutation = mutation
			affected, err = pu.sqlSave(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(pu.hooks) - 1; i >= 0; i-- {
			mut = pu.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, pu.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// SaveX is like Save, but panics if an error occurs.
func (pu *PlaceUpdate) SaveX(ctx context.Context) int {
	affected, err := pu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (pu *PlaceUpdate) Exec(ctx context.Context) error {
	_, err := pu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (pu *PlaceUpdate) ExecX(ctx context.Context) {
	if err := pu.Exec(ctx); err != nil {
		panic(err)
	}
}

func (pu *PlaceUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   place.Table,
			Columns: place.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: place.FieldID,
			},
		},
	}
	if ps := pu.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := pu.mutation.PlaceName(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: place.FieldPlaceName,
		})
	}
	if nodes := pu.mutation.RemovedEmployeeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   place.EmployeeTable,
			Columns: []string{place.EmployeeColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pu.mutation.EmployeeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   place.EmployeeTable,
			Columns: []string{place.EmployeeColumn},
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
	if n, err = sqlgraph.UpdateNodes(ctx, pu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{place.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return 0, err
	}
	return n, nil
}

// PlaceUpdateOne is the builder for updating a single Place entity.
type PlaceUpdateOne struct {
	config
	hooks    []Hook
	mutation *PlaceMutation
}

// SetPlaceName sets the PlaceName field.
func (puo *PlaceUpdateOne) SetPlaceName(s string) *PlaceUpdateOne {
	puo.mutation.SetPlaceName(s)
	return puo
}

// AddEmployeeIDs adds the employee edge to Employee by ids.
func (puo *PlaceUpdateOne) AddEmployeeIDs(ids ...int) *PlaceUpdateOne {
	puo.mutation.AddEmployeeIDs(ids...)
	return puo
}

// AddEmployee adds the employee edges to Employee.
func (puo *PlaceUpdateOne) AddEmployee(e ...*Employee) *PlaceUpdateOne {
	ids := make([]int, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return puo.AddEmployeeIDs(ids...)
}

// Mutation returns the PlaceMutation object of the builder.
func (puo *PlaceUpdateOne) Mutation() *PlaceMutation {
	return puo.mutation
}

// RemoveEmployeeIDs removes the employee edge to Employee by ids.
func (puo *PlaceUpdateOne) RemoveEmployeeIDs(ids ...int) *PlaceUpdateOne {
	puo.mutation.RemoveEmployeeIDs(ids...)
	return puo
}

// RemoveEmployee removes employee edges to Employee.
func (puo *PlaceUpdateOne) RemoveEmployee(e ...*Employee) *PlaceUpdateOne {
	ids := make([]int, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return puo.RemoveEmployeeIDs(ids...)
}

// Save executes the query and returns the updated entity.
func (puo *PlaceUpdateOne) Save(ctx context.Context) (*Place, error) {

	var (
		err  error
		node *Place
	)
	if len(puo.hooks) == 0 {
		node, err = puo.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*PlaceMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			puo.mutation = mutation
			node, err = puo.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(puo.hooks) - 1; i >= 0; i-- {
			mut = puo.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, puo.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX is like Save, but panics if an error occurs.
func (puo *PlaceUpdateOne) SaveX(ctx context.Context) *Place {
	pl, err := puo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return pl
}

// Exec executes the query on the entity.
func (puo *PlaceUpdateOne) Exec(ctx context.Context) error {
	_, err := puo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (puo *PlaceUpdateOne) ExecX(ctx context.Context) {
	if err := puo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (puo *PlaceUpdateOne) sqlSave(ctx context.Context) (pl *Place, err error) {
	_spec := &sqlgraph.UpdateSpec{
		Node: &sqlgraph.NodeSpec{
			Table:   place.Table,
			Columns: place.Columns,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: place.FieldID,
			},
		},
	}
	id, ok := puo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "ID", err: fmt.Errorf("missing Place.ID for update")}
	}
	_spec.Node.ID.Value = id
	if value, ok := puo.mutation.PlaceName(); ok {
		_spec.Fields.Set = append(_spec.Fields.Set, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: place.FieldPlaceName,
		})
	}
	if nodes := puo.mutation.RemovedEmployeeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   place.EmployeeTable,
			Columns: []string{place.EmployeeColumn},
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
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := puo.mutation.EmployeeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   place.EmployeeTable,
			Columns: []string{place.EmployeeColumn},
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
	pl = &Place{config: puo.config}
	_spec.Assign = pl.assignValues
	_spec.ScanValues = pl.scanValues()
	if err = sqlgraph.UpdateNode(ctx, puo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{place.Label}
		} else if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	return pl, nil
}
