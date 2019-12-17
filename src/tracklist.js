import React from 'react';
import data from "./tracks.json";
import App from './App.js';


class Tracklist extends React.Component{
  constructor(props) {
    super(props);
    this.state = {tracks : []}
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
    //fetch data for a track here (i.e. from Spotify or Soundcloud)s
    this.setState({ tracks: data.tracks });
  }
  
  renderListItem(track, i) {
    let trackClass = this.props.currentTrackIndex === track.id
      ? "selected"
      : "";
    return (
      <div class="info">
    
      <li
        key={track.id}
        class={trackClass}
        ref={cur => {
          if (this.props.currentTrackIndex === track.id) {
            this.activeTrack = cur;
          }
        }}
        onClick={()=>{this.props.selectTrackNumber(track.id)}}
      >
        <div class="song-box">
          <div class="list-artist">{track.artist}</div>
          <div class="list-title">{track.title}</div>
          <div class="list-duration">{track.duration}</div>
        </div>
      </li>
     
      </div>
    );
  }
  render() {
    let tracks = this.state.tracks.map(this.renderListItem);
    return (
     
      <ul
        class="TrackList"
        ref={input => {
          this.trackList = input;
        }}
      >
        {tracks}
      </ul>
     
    );
  }
}
  

  export default Tracklist