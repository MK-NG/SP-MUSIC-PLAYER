import React from 'react'
import data from './Data/tracks.json';


class Tracklist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tracks : []
      }
      this.renderListItem = this.renderListItem.bind(this);
    }
    componentDidUpdate() {
      if (this.activeTrack) {
        let topOfTrackList = this.trackList.scrollTop;
        let bottomOfTrackList =
          this.trackList.scrollTop + this.trackList.clientHeight;
        let positionOfSelected = this.activeTrack.offsetTop;
        if (
          topOfTrackList > positionOfSelected ||
          bottomOfTrackList < positionOfSelected
        ) {
          this.trackList.scrollTop = positionOfSelected;
        }
      }
    }
    componentDidMount() {
      

      this.setState({ tracks: data.tracks });
        

    }

    
    renderListItem(track, i) {
      let trackClass = this.props.currentTrackIndex === track.id
        ? "selected"
        : "";
      return (
        <li

          key={track.id}
          className={trackClass}
          ref={cur => {
            if (this.props.currentTrackIndex === track.id) {
              this.activeTrack = cur;
            }
          }}
          onClick={()=>{this.props.selectTrackNumber(track.id)}}
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
         
            <i className="fa fa-plus-circle playlistButton" onClick={()=>{this.props.addToPlaylist(track.id)}} />
          
        </li>
      
       
      );
    }
    
    
    render() {
      let tracks = this.state.tracks.map(this.renderListItem);
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

    export default Tracklist;