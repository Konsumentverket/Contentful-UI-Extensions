
export const getContentType = (entry,contentTypes) => {
    if(!entry || !contentTypes) return "";
    var contentType = contentTypes.items.find(y => y.sys.id == entry.sys.contentType.sys.id);
    return contentType.name;
}


export const getTitle = (entry,contentTypes) => {
    if(!entry || !contentTypes) return "";
    var contentType = contentTypes.items.find(y => y.sys.id == entry.sys.contentType.sys.id);
    return entry.fields[contentType.displayField].sv;
}

export const getStatus = (entity) => {

    if(!entity) return "";

    if(isDraft(entity))
        return "draft";
    if(isChanged(entity))
        return "changed";
    if(isArchived(entity))
        return "archived";

    return "published"

}




function isDraft(entity) {
    return !!!entity.sys.publishedVersion
  }
  
function isChanged(entity) {
return !!entity.sys.publishedVersion &&
    entity.sys.version >= entity.sys.publishedVersion + 2
}

function isArchived(entity) {
    return !!entity.sys.archivedVersion
}