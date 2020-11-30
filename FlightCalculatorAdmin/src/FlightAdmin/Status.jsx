import React, {useEffect, useState} from 'react'
import styled from 'styled-components';


const Content = styled.div`
    border-top: 1px solid #bebebe
    p{
        margin: 5px;
    }
    span{
        font-weight: bold;
    }
`;
const ContentHeading = styled.h1`
    margin-bottom: 2px;
`;


export default ({settings}) => {


    const [docCount, setDocCount] = useState(0)
    const [alias] = useState(settings.ElasticsearchAlias);
    const [index, setIndex] = useState(null);
    useEffect(()=>{

        const credentials = new Buffer.from(`${settings.ElasticsearchUserName}:${settings.ElasticsearchPassword}`).toString('base64')
        fetch(`https://cors.io/?${settings.ElasticsearchUrl}/${settings.ElasticsearchAlias}/_count`,{     
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Basic ${credentials}`
            }

        })
        .then(response => response.json())
        .then(json => setDocCount(json.count));

        fetch(`${settings.ElasticsearchUrl}/_alias/${settings.ElasticsearchAlias}`,{     
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Basic ${credentials}`
            }
        })
        .then(response => response.json())
        .then(json => setIndex(Object.keys(json)));
    },[])


    return <section>
                <ContentHeading>Status</ContentHeading>
                <Content>
                    <p><span>ElasticSearch server: </span> {settings.ElasticsearchUrl}</p>
                    <p><span>Number of airports: </span>{docCount}</p>
                    <p><span>Alias: </span>{alias}</p>
                    <p><span>Index: </span>{index}</p>
                </Content>
            </section>
    

}



