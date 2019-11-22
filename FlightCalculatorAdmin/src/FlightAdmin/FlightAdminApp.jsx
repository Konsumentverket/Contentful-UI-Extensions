var React = require('react');
import { createGlobalStyle } from 'styled-components';
import { addTerm, removeTerm, search, getAirports, createIndex, aliasExists, reIndexOnServer, reIndexAirports, switchAlias, saveCustomName } from './elasticClient.js';
var Status = require('./Status.jsx').default;
var Airports = require('./Airports.jsx').default;

const GlobalStyle = createGlobalStyle`
  body {
    background-color:#fbfbfb;
    max-width: 65em;
    min-width: 45em;
    width: 65em;
    overflow: visible;
    position: relative;
    padding: 1.5em;
    margin: 0px;
    font: 13px Myriad,Helvetica,Tahoma,Arial,clean,sans-serif;
  }

  section {
    margin-bottom: 20px;
  }

`;


export default class FlightAdminApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            airportToEdit: null,
            importStatus: [],
        };
    }

    EditAirport(airport) {

        this.setState({
            airportToEdit: this.state.airportToEdit === airport ? null : airport
        });

    }

    ImportAirports() {
        var startTime = (new Date).getTime();
        var self = this;
        self.setState({ importStatus: [`0ms: Downloading airports`] });
        var airports = {};
        var newIndex = null
        getAirports(self.props.settings).then(json => {
            Object.values(json)
                .filter(x => {
                     return x.iata && x.iata.length == 3})
                .forEach(a => airports[a.iata] = a);
            console.log("filtered airports",airports)
            self.setState({ importStatus: [...self.state.importStatus,`${(new Date).getTime() - startTime} ms: Download completed, number of airports ${Object.values(json).length}`] });
            return createIndex(self.props.settings)
        }).then(response => {
            console.log("createIndex",response);
            newIndex = response.index
            self.setState({ importStatus: [...self.state.importStatus,`${(new Date).getTime() - startTime} ms: Created new index: ${newIndex} `] });
            return aliasExists(self.props.settings)
        }).then(response => {
            console.log("aliasExists",response);
            if(response.status != 200){
                self.setState({ importStatus: [...self.state.importStatus,`${(new Date).getTime() - startTime} ms: Alias did not exist, please create it first: `] });
                return;
            }
            self.setState({importStatus: [...self.state.importStatus,`${(new Date).getTime() - startTime} ms: Alias exists`]});
            return reIndexOnServer(self.props.settings,newIndex);
        }).then(response => {
            console.log("reIndexOnServer",response);
            self.setState({importStatus: [...self.state.importStatus,`${(new Date).getTime() - startTime} ms: Reindexed previous airports to new index`]});
            return reIndexAirports(self.props.settings,airports,newIndex);
        }).then(response => {
            self.setState({importStatus: [...self.state.importStatus,`${(new Date).getTime() - startTime} ms: Bulk imported airports into new index`]});
            return switchAlias(self.props.settings,newIndex)
        }).then(response => {
            self.setState({importStatus: [...self.state.importStatus,`${(new Date).getTime() - startTime} ms: Switched alias to new index`]});
            self.setState({importStatus: [...self.state.importStatus,`${(new Date).getTime() - startTime} ms: Done!`]});
        })
    }

    RemoveSearchTermFromAirport(term) {
        var self = this;
        removeTerm(this.props.settings,this.state.airportToEdit.iATA,term).then(x => {
            console.log(x);
            var airportToEdit = self.state.airportToEdit;
            airportToEdit.additionalTerms = [...airportToEdit.additionalTerms.filter(x => x !== term)];
            self.setState({
                airportToEdit: airportToEdit
            });
        })
    }

    AddSearchTermToAirport(term) {
        var self = this;
        addTerm(this.props.settings,this.state.airportToEdit.iATA,term).then(x => {
            console.log(x);
            var airportToEdit = self.state.airportToEdit;
            airportToEdit.additionalTerms = [...airportToEdit.additionalTerms, term];
            self.setState({
                airportToEdit: airportToEdit
            });
        })


    }

    SearchAirport(query) {
        var self = this;
        search(this.props.settings,query).then(json => {
            console.log(json);
            self.setState({
                searchResult: json.hits.hits,
                airportToEdit: null
            });
        });
    }

    SaveCustomName(name) {
        var self = this;
        var startTime = (new Date).getTime();
        self.setState({importStatus: [`${(new Date).getTime() - startTime} ms: Saving customName`]});
        saveCustomName(this.props.settings,name,this.state.airportToEdit.iATA).then(x => {
            console.log(x);
            self.setState({importStatus: [`${(new Date).getTime() - startTime} ms: Saved customName successfully`]});
        })
    }

    render() {
        return (
            <div>
                {this.state.importStatus.map((term,i) => <p key={i}>{term}</p>)}
                <Status settings={this.props.settings} />
                <Airports OnSearchAirport={this.SearchAirport.bind(this)}
                    searchResult={this.state.searchResult}
                    importAirports={this.ImportAirports.bind(this)}
                    editAirport={this.EditAirport.bind(this)}
                    airportToEdit={this.state.airportToEdit}
                    addSearchTermToAirport={this.AddSearchTermToAirport.bind(this)}
                    removeSearchFromAirportTerm={this.RemoveSearchTermFromAirport.bind(this)}
                    saveCustomName={this.SaveCustomName.bind(this)}
                />
                <GlobalStyle />
            </div>);
    }
}