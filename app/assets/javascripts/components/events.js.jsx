function createEvents(data) {
  React.render(<Event data = { data } />, document.getElementById('events'));

  $('#events').css('textAlign', 'left');
  $('.events-container').animate({opacity: '1'}, 600);
}

function noEvents() {
  React.render(<Hipster />, document.getElementById('events'));

  $('.events-container').animate({opacity: '1'}, 600);
}

class Hipster extends React.Component {
  render() {
    return <div className="hipster">
      <h2>Looks like you're a little too hipster for us!</h2>
      <h3>We couldn't find any upcoming shows for you.</h3>
      <h3>Try changing your location, or <a href="/playlists">checking another playlist?</a></h3>
    </div>
  }
}

class Event extends React.Component {
  render() {
    return <div className="events-container">
      {
        this.props.data.map(function(event) {
          return <div key = { event.id } className="row">
            <Showtime data = { event } />
            <Artist data = { event } />
            <Venue data = { event } />
            <Tickets data = { event } />
          </div>
        })
      }
    </div>
  }
}

class Showtime extends React.Component {
  render() {
    var url = this.props.data.url;
    var date = new Date(this.props.data.datetime).toString().split(' ');

    return <div className="datetime">
      <a href={ url }>
        <p className="month">{ date[1] }</p>
        <p className="day">{ date[2] }</p>
      </a>
    </div>
  }
}

class Artist extends React.Component {
  render() {
    var url = this.props.data.url;
    var artists = this.props.data.artists;

    return <div className="artists">
      {
        artists.map(function(artist) {
          if (artists[artists.length - 1] === artist) {
            return <a href={ url }><span className="artist-name">{ artist.name }</span></a>
          } else {
            return <a href={ url }><span className="artist-name">{ artist.name }, </span></a>
          }
        })
      }
    </div>
  }
}

class Venue extends React.Component {
  render() {
    var url = this.props.data.url;
    var venue = this.props.data.venue;

    if (venue.country == 'United States') {
      return <div className="venue">
        <a href={ url }>
          <span className="venue-location">{ venue.city }, { venue.region }</span>
        </a>
          <span className="venue-name">{ venue.name }</span>
      </div>
    } else {
      return <div className="venue">
        <a href={ url }>
          <span className="venue-location">{ venue.city }, { venue.country }</span>
        </a>
          <span className="venue-name">{ venue.name }</span>
      </div>
    }
  }
}

class Tickets extends React.Component {
  render() {
    if (this.props.data.ticket_status === 'available') {
      return <div className="tickets available">
        <a className="btn btn-default" href={ this.props.data.ticket_url }>Tickets</a>
      </div>
    } else {
      return <div className="tickets unavailable">
        <a className="btn btn-default" href={ this.props.data.ticket_url }>Sold Out</a>
      </div>
    }
  }
}
