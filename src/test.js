const log = (val) => JSON.stringify(val, null, 2);

const Track = (props) => {

	const displayIcon = (type) => {
  	const adding = type === 'add';
  	return (
  		<span title={adding? 'add track' : 'remove track'}>{adding ? '+' : '-'}</span>
  	)
  };
  
	return (
  	<span onClick={() => props.clickHandler(props.track)}>
      {displayIcon(props.type)} {props.track.title ||props.track.name} - {props.track.artist}
    </span>
  )
}

const Tracklist = (props) => {
	const listType = props.listType;
	return (
  	<div>
      {props.playlist.length === 0 ?
        ( <strong>No tracks in list yet.</strong> ) :
        ( <ul>
            
          { props.playlist.map((track) => 
          	(
              <li key={track.id} >
                { listType === 'playlist' ? 
                  <Track 
                    clickHandler={props.clickHandler} 
                    type="remove" 
                    track={track} /> : 
                  <Track 
                    clickHandler={props.clickHandler} 
                    type="add" 
                    track={track} /> }
                <span>{props.isInList && props.isInList(track) ? 
                ' - added' : null
                }
                </span>
              </li>
            )
          )}
        </ul> )
      }
    </div>
  )
}

const initialState = {
	playlist: [{
  	id: 0,
    title:'Black or White',
    artist: 'Michael Jackson'
  },
  {
  	id: 1,
    title:'Bad',
    artist: 'Michael Jackson'
  },
  ]
};

const searchData = {
    	playlist: [
      	{id: 's1', name:'biggiesearch',artist:'biggiesmallssearch',album:'reaady to diesearch'},				
        {id: 's2', name:'nassearch',artist:'nasessearch',album:'illmaticsearch'},		
      	{id: 's3', name:'eminemsearch',artist:'emsearch',album:'marshall matherssearch'}
      ]
};

class App extends React.Component {
	constructor(props) {
  	super(props);
    this.state = initialState;
    
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.isInList = this.isInList.bind(this);
  }
  
	render () {
  	return (
    	<div>
       <h1>Playlist:</h1>
    	  <Tracklist 
    	    listType="playlist" 
    	    playlist={this.state.playlist} 
    	    clickHandler={this.remove}
          />
        <h1>Search result:</h1>
        <Tracklist 
          playlist={searchData.playlist}
          clickHandler={this.add} 
          isInList={this.isInList}
          />
          <pre>{log(this.state)}</pre>
       </div>
    )
  }
  
  add (newTrack) {
  	console.log('Add track', newTrack);
    if (this.state.playlist.filter(track => track.id === newTrack.id).length === 0) {
      this.setState({
        ...this.state,
				playlist: [
        	...this.state.playlist,
          newTrack
        ]
      });
    }
  }
  
  isInList (track) {
  	// used for displayling if search result track is already in playlist
  	return this.state.playlist.filter(playlistTrack => 
    	playlistTrack.id === track.id).length > 0;
  }
  
  remove (trackToRemove) {
  	console.log('remove', trackToRemove);
    this.setState({
    	...this.state,
      playlist: this.state.playlist.filter(track => track.id !== trackToRemove.id)
    });
  }
}

ReactDOM.render(
	<App/>,
  document.getElementById('root')