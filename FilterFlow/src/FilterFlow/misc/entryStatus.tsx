
export default (entity : any) => {


    if(isDraft(entity))
        return "draft";
    if(isChanged(entity))
        return "changed";
    if(isArchived(entity))
        return "archived";

    return "published"
}

function isDraft(entity : any) {
    return !!!entity.sys.publishedVersion
  }
  
function isChanged(entity : any) {
return !!entity.sys.publishedVersion &&
    entity.sys.version >= entity.sys.publishedVersion + 2
}

function isArchived(entity : any) {
    return !!entity.sys.archivedVersion
}