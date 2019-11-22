var React = require('react');
var ReactDOM = require('react-dom');
import styled from 'styled-components';
var AirportToEdit = require('./AirportToEdit.jsx').default;


const SearchInput = styled.div`

    margin: 20px 0 0 5px;

    label{
        display: block;
    }
    input{
        display: inline-block;
    }
    input[type="text"]{
        width: 30%;
        margin-right: 10px;
    }
    input[type="button"]{
        width: 10%;
    }
`;

const ResultTable = styled.table`

    margin-top: 20px;
    margin-left: 5px;
    border-spacing: 0;

    th{
        background: #f1f1f1;
        border: 1px solid #aeaeae;
        
        text-align: left;
    }
    td{
        border: 1px solid #aeaeae;
        border-top: none;
        padding: 1px;
        a {
            color: #1a4aa4;
            cursor: pointer;
        }
        a.map{
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAkFJREFUOI2lk01IlFEYhZ9zZwZi0NApisKEFmFqP6v+Ni362VTkfGqLoiCIXLUJilplbYJWQURBBEGbCGn8SCnFRShUhBsxNyP90CqUsogmlfnufduMNU3tenfn5dxzDuflin9MR0fHOkl7gCZJi8DU/Pz8s6GhocVarqpBFEVNwBWgE2iorL8AH0IIknQvjuMbgP0lEEXRVuCKmZUkHQPehhDWSjpaLpfHstlsSJJkP3Bwbm7u9OjoaALgALq7u3NADByuPAb4JOlkOp1+kc1mv83Ozpb6+/sfmdmdXC53dcnYAXjvLwJD1YnM7IGktd77m+Vy+VRjY+OFzs7O9XEcvwQWu7q62gFcT09PJoTQFkI4/kc5kjOzATMrSjohaUOhUHgHkCTJTe/9SYD0zMxMO7DLOVdX5X4tjuPrFXgJIJ/Pr8jn862VXb2kHIBLpVIrnXPLq93NbLz2XHEcfzazHZJ2SxoGVgGkQwjfJKVr+JejKHpjZqtLpdLzkZGREkAmk3novX8FNJhZM4BLkmTKzB4DT38169wmYELScF1d3YGlvff+CLC50tE4gBscHPwBfPTenzOzJ7XRzexQFdwWQvhQEbgPv894LZVKnffen6kVkLSsUmKrmW0B6oG4UCiMAaQApqenv7a0tARJtyStqRYIIWxsa2ubkHRb0nZJxRBCVCwWF+Dvv7DTzO5Kaq9NEkLwku5lMpmzfX19338lrCX29va6ycnJvcC+EEKzc27BzF577/sHBgbe1/L/e34Cc0oAJHOAfV8AAAAASUVORK5CYII=') no-repeat;
            width: 17px;
            height: 17px;
            display: block;
            position: relative;
            left: 8px;
            
        }
    }

`;



export default class SearchAirport extends React.Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    search() {
        this.props.OnSearchAirport(this.textInput.current.value);
    }

    render() {



        return (
            <div>
                <SearchInput>
                    <label htmlFor="query">Sök flygplats</label>
                    <input id="query" type="text" ref={this.textInput} />
                    <input type="button" value="Sök" onClick={this.search.bind(this)} />
                </SearchInput>

                <ResultTable>
                    <thead>
                        <tr>
                            <th width="40px">IATA</th>
                            <th width="220px">Name</th>
                            <th width="100px">Län</th>
                            <th width="150px">Stad</th>
                            <th width="100px">Land-en</th>
                            <th width="100px">Land-sv</th>
                            <th width="30px">Karta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.searchResult.map(function (hit) {
                            const airport = hit._source;
                            var editTr = null;
                            if (this.props.airportToEdit !== null && this.props.airportToEdit.iATA === airport.iATA) {
                                editTr = <tr>
                                    <td colSpan="7">
                                        <AirportToEdit
                                            airportToEdit={this.props.airportToEdit}
                                            addSearchTermToAirport={this.props.addSearchTermToAirport}
                                            removeSearchFromAirportTerm={this.props.removeSearchFromAirportTerm}
                                            saveCustomName={this.props.saveCustomName}
                                        />
                                    </td>
                                </tr>;
                            }

                            return (
                                <React.Fragment key={airport.iATA}>
                                    <tr key={airport.iATA}>
                                        <td><a title="Redigera flygplats" onClick={() => this.props.editAirport(airport)}>{airport.iATA}</a></td>
                                        <td>{airport.name}</td>
                                        <td>{airport.state}</td>
                                        <td>{airport.city}</td>
                                        <td>{airport.countryNameEn}</td>
                                        <td>{airport.countryNameSv}</td>
                                        <td><a target="_blank" title="Öppna karta" className="map" href={"https://www.google.se/maps/@" + airport.lat + "," + airport.lon + ",15z"} /></td>
                                    </tr>
                                    {editTr}
                                </React.Fragment>);
                        },this)}
                    </tbody>
                </ResultTable>


            </div>
        );
    }
}



