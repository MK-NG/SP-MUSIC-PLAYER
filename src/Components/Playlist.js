import React from 'react';


class Playlist extends React.Component {
    constructor(props) {
        super(props);
      this.renderListItem = this.renderListItem.bind(this);
    }
      renderListItem(track, i) {
        return (
          <li
            key={track.id}
           >
      
            <div className="song-box">
              <div>{track.id}</div>
              <div>{track.artist}</div>
  
                  {this.props.showAlbum === true &&
                       <div> {track.album}</div>
                  }   
                  {this.props.showAlbum=== false &&
                      <div >{track.title}</div>
                  }
  
              <div>{track.duration}</div>
            </div>
           
              <i className="fa fa-minus-circle playlistButton" onClick={()=>{this.props.removeFromPlaylist(track.id)}} />
            
          </li>
        
         
        );
      }
    
      render() {
        let tracks = this.props.playlist.map(this.renderListItem);
        return (
          <ul
            className="TrackList"
            ref={input => {
              this.trackList = input;
            }}
          >
            {tracks}
          </ul>
        );
      }
      }

export default Playlist
