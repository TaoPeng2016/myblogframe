# myblogframe 
```
Catalog Structure:

Myblogframe
    |
    |___.git                            
    |___.vscode
    |
    |___node_module                                    //npm modules
    |
    │___package.json                                   // required modules and configuration information
    |___package-lock.json
    |
    |___app.js                                         //app entry point
    |
    |___model
    |      |
    |      |----config.js
    |      |----db.js                                  //mongoDB find, update, insert, delete
    |      |----tools.js                               //md5 encryption
    |
    |
    |___routes                                         //application routes
    |      |      
    |      |----admin(backend)
    |      |      |----login.js                        //backend login
    |      |      |----manage.js                       //backend manage
    |      |      |----user.js                         //backend user
    |      |     
    |      |     
    |      |----admin.js                               // backend home page 
    |      |----api.js                                 // route controllers for all the endpoints of the app
    |      |----index.js                               //frontend home page
    |          
    |  
    |___views
    |      |----admin (backend)
    |      |       |    
    |      |       |----manage                         //backend content management 
    |      |       |       |
    |      |       |       |----add.html               //backend page for adding content 
    |      |       |       |----list.html              //backend  content 
    |      |       |    
    |      |       |----public                         //backend dashboard page Header,nav_left, nav_top, Footer
    |      |       |       |
    |      |       |       |----Footer.html    
    |      |       |       |----Header.html    
    |      |       |       |----nav_left.html          
    |      |       |       |----nav_top.html  
    |      |       |               
    |      |       |----user                           //backend user management page
    |      |       |       |
    |      |       |       |----add.html               //Backend page for adding user
    |      |       |       |----list.html              //Backend user information
    |      |       |          
    |      |       |----error.html                     //backend error page
    |      |       |----index.html                     //backend dashboard page
    |      |       |----login.html                     //backend login page
    |      |             
    |      |----default(frontend)                      //frontend pages
    |             |    
    |             |----public
    |             |       |
    |             |       |----Header.html    
    |             |    
    |             |----index.html                       //frontend home page
    |             |----news.html                        //frontend news page
    |             |----service.html                     //frontend service page
    |             |----content.html                     //frontend content page
    |             |----about.html                       //frontend about page
    |             |----case.html                        //frontend case page
    |             |----connect.html                     //frontend connect page
    |            
    |          
    |___public                                          //public files
    |      |          
    |      |----admin(backend)                          //backend public files
    |      |      |    
    |      |      |----avatars    
    |      |      |----css    
    |      |      |----font    
    |      |      |----images    
    |      |      |----js    
    |      |          
    |      |----default(frontend)                       //frontend public files
    |             |----css    
    |             |----images    
    |             |----js 
    |                
    |___.gitignore                
          
```
