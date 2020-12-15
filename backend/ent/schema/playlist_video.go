package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
)

// Playlist_Video holds the schema definition for the Playlist_Video entity.
type Playlist_Video struct {
	ent.Schema
}

// Fields of the Playlist_Video.
func (Playlist_Video) Fields() []ent.Field {
	return []ent.Field{
		field.Time("added_time"),
	}
}

// Edges of the Playlist_Video.
func (Playlist_Video) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("playlist", Playlist.Type).Ref("playlist_videos").Unique(),
		edge.From("video", Video.Type).Ref("playlist_videos").Unique(),
		edge.From("resolution", Resolution.Type).Ref("playlist_videos").Unique(),
	}
}
