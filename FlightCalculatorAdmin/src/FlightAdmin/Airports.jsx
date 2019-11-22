var React = require('react');
var ReactDOM = require('react-dom');
import styled from 'styled-components';
var SearchAirport = require('./SearchAirport.jsx').default;
var AirportToEdit = require('./AirportToEdit.jsx').default;

const Content = styled.div`
    border-top: 1px solid #bebebe
    position: relative;
`;

const ImportAirportsButton = styled.input`
    position: absolute;
    right: 0px;
    top: -25px;
`;

const ContentHeading = styled.h1`
    margin-bottom: 2px;
    
`;

export default class Airports extends React.Component {



    render() {
        return (
            <section>
                <ContentHeading>Flygplatser</ContentHeading>
                <Content>
                    <ImportAirportsButton type="button" value="Importera flygplatser" onClick={this.props.importAirports} />
                    <SearchAirport
                        OnSearchAirport={this.props.OnSearchAirport}
                        editAirport={this.props.editAirport}
                        searchResult={this.props.searchResult}
                        airportToEdit={this.props.airportToEdit}
                        addSearchTermToAirport={this.props.addSearchTermToAirport}
                        removeSearchFromAirportTerm={this.props.removeSearchFromAirportTerm}
                        saveCustomName={this.props.saveCustomName}
                    />
                    
                </Content>
            </section>);
    }
}



