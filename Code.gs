/* Written by Amit Agarwal on August 9, 2013 */
 
function doGet() {
  var output = HtmlService.createHtmlOutputFromFile('labnol');
  output.setTitle('Publish Website on Google Drive');
  return output;  
}
 
function uploadWebsite(form) {
  
  try {
    
    var zip, files, name, folder, file, host, found=false;
    
    zip    = form.zipFile.setContentType("application/zip");
    files  = Utilities.unzip(zip);
    
    // Unique folder name based on the current date and time
    name   = Utilities.formatDate(new Date(), "GMT", "ddMMyyyyHHmmss");
    folder = DriveApp.createFolder("Website #" + name);    
    
    for (var i=0; i<files.length; i++) {
      file = folder.createFile(files[i]);
      if (file.getName() === "index.html") {
        found = true; 
      }       
    }
    
    if (found) {
      // Set the sharing permissions of the Drive folder as Public
      folder.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
      var site = "https://googledrive.com/host/" + folder.getId() + "/";      
      return 'Your <a href="' + site + '" target="_blank">website</a> is now live on Google Drive. The URL is: ' + site;
    } else {
      // if the index.html file is not available, don't publish the website
      DriveApp.removeFolder(folder);
    }
    
    return "Sorry, we couldn't find an index.html in your zip file. Please try again.";
    
  } catch (e) {    
    return e.toString();    
  }
  
}
