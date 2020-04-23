# Description text

This extension is used for documentation for editors in Contentful. Add a new field, use text (Long text). And configure the extension on the field.  
  
You can choose to save the information on the entry-level if you instead want to use the same documentation on every entry of that content-type you can fetch the document from another entry. Just configure an id and the extension will fetch the data from `documentation`.  
  
## Upload the extension to Contentful
Create a file ~/DescriptionText/src/env.json
```
{
  "accessToken": "yourtoken"
}
```
  
When you created the file run these commands.
```
npm install
npm run configure
npm run deploy
```