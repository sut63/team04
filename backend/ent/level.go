// Code generated by entc, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"

	"github.com/B6001186/Contagions/ent/level"
	"github.com/facebookincubator/ent/dialect/sql"
)

// Level is the model entity for the Level schema.
type Level struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// LevelName holds the value of the "LevelName" field.
	LevelName string `json:"LevelName,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the LevelQuery when eager-loading is set.
	Edges LevelEdges `json:"edges"`
}

// LevelEdges holds the relations/edges for other nodes in the graph.
type LevelEdges struct {
	// Area holds the value of the area edge.
	Area []*Area
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
}

// AreaOrErr returns the Area value or an error if the edge
// was not loaded in eager-loading.
func (e LevelEdges) AreaOrErr() ([]*Area, error) {
	if e.loadedTypes[0] {
		return e.Area, nil
	}
	return nil, &NotLoadedError{edge: "area"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Level) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullString{}, // LevelName
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Level fields.
func (l *Level) assignValues(values ...interface{}) error {
	if m, n := len(values), len(level.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	l.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field LevelName", values[0])
	} else if value.Valid {
		l.LevelName = value.String
	}
	return nil
}

// QueryArea queries the area edge of the Level.
func (l *Level) QueryArea() *AreaQuery {
	return (&LevelClient{config: l.config}).QueryArea(l)
}

// Update returns a builder for updating this Level.
// Note that, you need to call Level.Unwrap() before calling this method, if this Level
// was returned from a transaction, and the transaction was committed or rolled back.
func (l *Level) Update() *LevelUpdateOne {
	return (&LevelClient{config: l.config}).UpdateOne(l)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (l *Level) Unwrap() *Level {
	tx, ok := l.config.driver.(*txDriver)
	if !ok {
		panic("ent: Level is not a transactional entity")
	}
	l.config.driver = tx.drv
	return l
}

// String implements the fmt.Stringer.
func (l *Level) String() string {
	var builder strings.Builder
	builder.WriteString("Level(")
	builder.WriteString(fmt.Sprintf("id=%v", l.ID))
	builder.WriteString(", LevelName=")
	builder.WriteString(l.LevelName)
	builder.WriteByte(')')
	return builder.String()
}

// Levels is a parsable slice of Level.
type Levels []*Level

func (l Levels) config(cfg config) {
	for _i := range l {
		l[_i].config = cfg
	}
}