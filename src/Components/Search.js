import React, { Component } from 'react'
import axios from 'axios'
import Suggestions from './Suggestions'

// const token =  'BQB4gdTt6LXnpdwqWox4kYpEgXnMT2KXbFa5WDQ9Fs5sRsKivnHxCBvN07dbUrOnA5J8DCCcTcMLMR-jUjBEqrAxAzElBLJ_qo3hvvUaglo6jPiEHzy4KjwO_JzgAMfEa9X21BG-VPM0Vl1f-3aQrPNKNfA0KQ'
const url = 'https://api.spotify.com/v1/search?q='


class Search extends Component {
  state = {
    query: '',
    results: []
  }
  
  getInfo = () => {
	  let token = this.props.token;

	  axios.get('https://api.spotify.com/v1/search?q=' + this.state.query +'&type=artist&limit=6', {
		  headers: {
			  'Authorization': 'Bearer ' + token
			}})
			.then(({ data }) => {
				console.log(data.artists)
				this.setState({
					results: data.artists.items
				})
			})
			.catch(() => this.setState({ error: true }))
			
			
		}
		
		
		

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }

  
  render() {
    return (
      <form>
        <input
          placeholder="Search for artists..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
		<div className="spotify-list">
        <Suggestions results={this.state.results} />
		</div>
      </form>
    )
  }
}

export default Search

