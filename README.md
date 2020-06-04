# Contentful-UI-Extensions

All UI Extensions are created using the 'Create Contentful Extension' CLI  https://github.com/contentful/create-contentful-extension.


## UrlSlug
The url slug is a basic slug with a twist how i handles swedish diacritics.  
It also forces the editor to write correct url safe slugs.

## QuizAnswer
This extension is designed for the quiz tool to handle answer options. 
It contains fields for answers, feedback and a checkbox for correct/incorrect answer.

## ItemsList
This extension makes listing items in an alternative way possible.
The use case is when you want to list something and you don't want to use content or freetext editors.

### Options
**Name**: ItemsList  
**Field type**: Object  
**Instance parameters**:  
```
{
    "id": "helpText",
    "type": "Symbol",
    "name": "Help text",
    "description": "Help text for a user to help them understand the editor"
},{
    "id":"listItemType",
    "name": "Type of list",
    "type": "Enum",
    "required": true,
    "options": ["Text"],
    "description": "The type of item to list"
}
```

## Microcopy
This extension is used to add Microcopy values without having to use Content or Contentmodels for adding microcopy texts.
You define an area ex. 'Footer' and then define keys and values connected to the 'Footer'.

## FilterFlow
This extension is used to create filtering flows to help users navigate to the right content based on a series of questions.

Its built using [React flow chart](https://github.com/MrBlenny/react-flow-chart) as a base. The extension opens in a full screen dialog using Contentfuls dialogs.

Installation of the extension is not possible thru the `npm run deploy` script as the bundled script exceeds the size limit of Contentful. Instead we install it using github pages and the build folder and point the extension to the correct github pages url.  
Github pages url: [https://konsumentverket.github.io/Contentful-UI-Extensions/FilterFlow/build](https://konsumentverket.github.io/Contentful-UI-Extensions/FilterFlow/build)

### Options
**Name**: FilterFlow  
**Field type**: Object  
**Instance parameters**:  
```
{
    "id": "helpText",
    "type": "Symbol",
    "name": "Help text",
    "description": "Help text for a user to help them understand the editor"
},{
    "id":"resultEntrys",
    "name": "Type of result entrys",
    "type": "Symbol",
    "required": true
},
{
    "id":"explanationEntrys",
    "name": "Type of explanation entrys",
    "type": "Symbol",
    "required": true
},
{
    "id":"taxonomyEntrys",
    "name": "Type of taxonomy entrys",
    "type": "Symbol",
    "required": true
}
```

## DescriptionText
This extension is used for documentation for editors in Contentful.



