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


