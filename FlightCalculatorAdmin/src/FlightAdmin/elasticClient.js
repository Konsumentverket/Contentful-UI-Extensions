import { pimpData } from "./dataModifyer";

const getCredentials = (settings) => new Buffer.from(`${settings.ElasticsearchUserName}:${settings.ElasticsearchPassword}`).toString('base64')


export const addTerm = (settings, idToEdit, term) => {

    const query = {
        script: {
            params: {
                term: term
            },
            source: `if(ctx._source.additionalTerms == null){
                    ctx._source.additionalTerms = new ArrayList();\r\n                                            
                }
                ctx._source.additionalTerms.add(params.term)`
        }
    };


    return fetch(`https://cors.io/?${settings.ElasticsearchUrl}/${settings.ElasticsearchAlias}/_doc/${idToEdit}/_update`, {
        method: "POST",
        body: JSON.stringify(query),
        mode: 'no-cors',
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Basic ${getCredentials(settings)}`
        }

    })
        .then(response => response.json())

}


export const removeTerm = (settings, idToEdit, term) => {
    const query = {
        script: {
            params: {
                term: term
            },
            source: `ctx._source.additionalTerms.remove(ctx._source.additionalTerms.indexOf(params.term))`
        }
    };

    return fetch(`https://cors.io/?${settings.ElasticsearchUrl}/${settings.ElasticsearchAlias}/_doc/${idToEdit}/_update`, {
        method: "POST",
        body: JSON.stringify(query),
        mode: 'no-cors',
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Basic ${getCredentials(settings)}`
        }

    })
        .then(response => response.json())
}

export const search = (settings, query) => {

    var query = {
        "query": {
            "simple_query_string": {
                "query": query,
                "fields": ["iATA^100",
                    "name^5",
                    "additionalTerms",
                    "city^3",
                    "citySv",
                    "countryNameSv",
                    "countryNameEn"],
                "default_operator": "and"
            }
        }
    }

    return fetch(`https://cors.io/?${settings.ElasticsearchUrl}/${settings.ElasticsearchAlias}/_search`, {
        method: "POST",
        body: JSON.stringify(query),
        mode: 'no-cors',
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Basic ${getCredentials(settings)}`
        }

    })
    .then(response => response.json())

}


export const getAirports = (settings) => {
    return fetch("https://cors.io/?https://raw.githubusercontent.com/Konsumentverket/Airports/master/airports.json", {
        mode: 'no-cors',
        headers:{
            "Access-Control-Allow-Origin":"*"
        }
    })
    .then(response => response.json())
}

export const createIndex = (settings) => {

    var date = new Date();
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);
    if (gg < 10)
        gg = "0" + gg;
    if (mm < 10)
        mm = "0" + mm;
    var cur_day = aaaa + "-" + mm + "-" + gg;
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();
    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds;
    const timestamp = cur_day + "." + hours + ":" + minutes + ":" + seconds;
    const indexName = settings.ElasticsearchAlias + timestamp;

    var query = {
        "settings": {
            "number_of_shards": 1,
            "number_of_replicas": 1
        },
        "mappings":{
           "_doc":{
              "properties":{
                 "name":{
                    "type":"text",
                    "analyzer":"edgengram",
                    "search_analyzer":"standard"
                 },
                 "additionalTerms":{
                    "type":"text",
                    "analyzer":"edgengram",
                    "search_analyzer":"standard"
                 },
                 "city":{
                    "type":"text",
                    "analyzer":"edgengram",
                    "search_analyzer":"standard"
                 },
                 "citySv":{
                    "type":"text",
                    "analyzer":"edgengram",
                    "search_analyzer":"standard"
                 },
                 "countryNameSv":{
                    "type":"text",
                    "analyzer":"edgengram",
                    "search_analyzer":"standard"
                 },
                 "countryNameEn":{
                    "type":"text",
                    "analyzer":"edgengram",
                    "search_analyzer":"standard"
                 }
              }
           }
        },
        "settings":{
           "analysis":{
              "analyzer":{
                 "edgengram":{
                    "type":"custom",
                    "filter":[
                       "lowercase",
                       "edgengram_filter"
                    ],
                    "tokenizer":"standard"
                 }
              },
              "filter":{
                 "edgengram_filter":{
                    "type":"edge_ngram",
                    "max_gram":20,
                    "min_gram":1
                 }
              }
           }
        }
     }
     return fetch(`https://cors.io/?${settings.ElasticsearchUrl}/${indexName}/`, {
        method: "PUT",
        body: JSON.stringify(query),
        mode: 'no-cors',
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Basic ${getCredentials(settings)}`
        }

    })
    .then(response => response.json())

}

export const aliasExists = (settings) =>{
    return fetch(`https://cors.io/?${settings.ElasticsearchUrl}/_alias/${settings.ElasticsearchAlias}`,{
        method: "HEAD",
        mode: 'no-cors',
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Basic ${getCredentials(settings)}`
        }
    });
}

export const reIndexOnServer = (settings, newIndex) => {

    var query = {
        "dest":{
            "index":newIndex
        },
        "source":{
            "index":settings.ElasticsearchAlias
        }
    };

    return fetch(`https://cors.io/?${settings.ElasticsearchUrl}/_reindex`,{
        method: "POST",
        mode: 'no-cors',
        body: JSON.stringify(query),
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Basic ${getCredentials(settings)}`
        }
    }).then(response => response.json());

}

export const reIndexAirports = (settings, airports, newIndex) => {
    var requestStr = "";
    Object.values(airports).forEach((airport) => {
        const updateRequest = {"update":{
                "_id":airport.iata,
                "_index":newIndex,
                "_type":"_doc"
            }
        };
        const updateDoc = {
            "doc_as_upsert":true,
            "doc":pimpData(airport)
        }
        requestStr += JSON.stringify(updateRequest) +"\n"+JSON.stringify(updateDoc)+"\n";

    });
    return fetch(`https://cors.io/?${settings.ElasticsearchUrl}/${newIndex}/_bulk`,{
        method: "POST",
        mode: 'no-cors',
        body: requestStr,
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Basic ${getCredentials(settings)}`
        }
    })
}

export const saveCustomName = (settings,customName,iata) => {


    return fetch(`https://cors.io/?${settings.ElasticsearchUrl}/${settings.ElasticsearchAlias}/_doc/${iata}/_update`,{
        method: "POST",
        mode: 'no-cors',
        body: JSON.stringify({
            "doc" : {
                "customName" : customName
            }
        }),
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Basic ${getCredentials(settings)}`
        }
    })


}

export const switchAlias = (settings, newIndex) => {

    return fetch(`https://cors.io/?${settings.ElasticsearchUrl}/_aliases`,{
        method: "POST",
        mode: 'no-cors',
        body: JSON.stringify({
            "actions": [
                {"remove": { "index" : "*", "alias" : settings.ElasticsearchAlias }},
                {"add": { "index": newIndex, "alias": settings.ElasticsearchAlias }}
                
            ]
            }
        ),
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Basic ${getCredentials(settings)}`
        }
    });
        


}