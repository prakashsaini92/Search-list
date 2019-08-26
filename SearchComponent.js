import React from 'react';
import SearchResults from 'react-filter-search';
import SearchInput from './component/searchinput/input'


 class SearchList extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
            error: null,
            isLoaded: false,
            users: [],
            value: ''
          };
        }
      
        componentDidMount() {
          fetch("https://api.myjson.com/bins/nb3wj")
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  users: result
                });
              },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )
        }

        HandlerOnChange = (e) => {
            const {value} = e.target;
            this.setState(
                { value }
            );
          };
      
        render() {
          const { error, isLoaded, users, value } = this.state;
          if (error) {
            return <div>Sorry No Matches found</div>;
          } else if (!isLoaded) {
            return <div className="loading">Fetching Results...</div>;
          } else {
            return (
              <div className="mainCompo">
              <input type="text" placeholder="Search here..." value={value} onChange={this.HandlerOnChange} />
               <SearchResults 
                 value={value}
                    data={users}
                    renderResults={results => (
                    <table>
                            <tr> <th> Object Id</th>
                            <th>Full Name</th>
                            <th>Gender</th>
                            </tr>
                        {results.map(user => (
                        <tr>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.gender}</td>
                           
                        </tr>
                        ))}
                    </table>
                    )}
                  
               />
              </div>
            );
          }
        }
      }

export default SearchList;
 