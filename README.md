# E-Plan
## A Project Management System

# Architectural Design
## High-Level Architecture
![HL-Architecture](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/4b0b6db0ca0a727f7afca2ebea7bebd29f7daa89/wiki_images/HL-Architecture.svg)
#### `User`
The user is an actor who interacts with the user interface to fulfil his/her actions.

#### `Front End`
Front-end web development is the development of the graphical user interface of a website, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that website.

#### `Back End`
The backend of a website is pretty much everything the user can't see. Generally, this means the programming that generates pages that the user views, creating the "server-side" content of the site. This could be scripts, directives, databases, and other automated functions the server performs.

## Low-Level Architecture
<p align="center">
 <img src = "https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/f3284693c6d3acd6d857be86a635eb006c974f4b/wiki_images/LL-Architecture.svg"/>
</p>

#### `DNS`
DNS or Domain Name System is a fundamental system that helps search a domain name and IP address, and in this manner, a particular server receives a request sent by a user. We can say that DNS is like a phonebook but for Internet websites.

#### `Load Balancer (optional)`
Load Balancer primarily deals with horizontal scaling. By directing incoming requests to one of the multiple servers, the load balancer sends an answer to a user. Usually, web application servers exist in the form of multiple copies mirroring each other. Hence, any server processes requests in the same manner, and the load balancer distributes tasks among them so they will not be overcharged.

#### `Web App Servers`
This component processes a user’s request and sends documents (JSON, XML, etc.) back to a browser. To perform this task, it usually refers to back-end infrastructures such as databases, cache servers, job queues, and others. Besides, at least two servers, connected to the load balancer, manage to process the user’s requests.

#### `Databases`
The name of this web application component speaks for itself. The database gives instruments for organizing, adding, searching, updating, deleting, and performing computations. In most cases, web application servers directly interact with the job servers.

#### `Caching Service`
Caching service provides storage for data, which allows for storing and searching data. Whenever a user gets some information from the server, the results of this operation go to the cache. So, future requests return faster. In one word, caching allows you to refer to the previous result to make computation much faster. Therefore, caching is effective when:
  * the computation is slow
  * computation is likely to occur many times
  * When the results are the same for a particular request

#### `Job Queue (optional)`
The job queue consists of two components: the job queue itself and the servers. These servers process jobs in the queue. It happens that most the web-servers need to operate a vast amount of jobs that are not of primary importance. Therefore, when a job needs to be fulfilled, it goes to the job queue and is operated due to a schedule.

#### `Services`
When a web application reaches a specific level, services are created in the form of separate apps. They are not that visible among other web application components, but the web application and other services interact with them.

#### `Data Warehouse (optional)`
Almost every modern application implies the work with data such as collecting, storing and analyzing. These processes require three stages:
* The data is sent to the data “firehose”, which provides a streaming interface for the absorption and processing of data.
* Raw, processed, and additional data is sent to cloud storage.
* And processed and additional data also go to a data warehouse.
It’s a particular model of online storage and exchange of data through the Internet. The Data Warehouse can be used for storing a variety of files of different types such as videos, photos, and so on.

#### `CDN`
CDN or Content Delivery System deals with sending HTML files, CSS files, JS files, and images. It delivers the content of the end server throughout the world, so people can load various sources.


# Requirements 
## Functional Requirements 
R#| Description | Priority
--|--|-- 
R1| E-plan must allow the employee/admin to log into the system <br/> R1.1 E-plan must allow the user to register into the system <br/> R1.2 E-plan must allow the registered user to login to the system|16
R2|E-plan must allow the admin to create a new team|15
R3|E-plan must allow the admin to delete an existing team|14
R4|E-plan must allow the admin to add a new team member to the existing team|13
R5|E-plan must allow the admin to add a group of team members to the existing team|12
R6|E-plan must allow the admin to delete an existing team member|11
R7|E-plan must allow the admin to create a new project|10
R8|E-plan must allow the admin to delete an existing project|9
R9|E-plan must allow the admin to add an employee to the existing project|8
R10|E-plan must allow the admin to delete an employee from the project|7
R11|E-plan must allow the employee to view all his/her team members|6
R12|E-plan shall allow the employee to view all his/her projects associated. <br /> R12.1 E-Plan shall allow the employee/admin to view the skill set and description of other members in the project|5
R13|E-plan shall allow the employee to view all the issues in the project that he/she is associated with|4
R14|E-plan shall allow the employee to create a new issue inside a project that he/she is associated with. <br /> R14.1 E-plan shall allow the employee to attach or remove an attachment inside an issue within the project that he/she is associated with. <br /> R14.2 E-plan shall allow the employee to change the status of the issue. <br /> R14.3 E-plan shall allow the employee to change the assignee of the issue.|3
R15|E-plan shall allow the employee to delete the existing issue that he/she created within the project that he/she associated with|2
R16|E-plan shall allow the employee/admin to log out of the system|1

## Non Functional Requirements 
NR#| Description | Traceability
--|--|-- 
NR1| The E-plan system shall provide the admin and employees with the ability to filter team members based on the services they provide | R11
NR2| The E-plan system must have a response time to the user requests with in 2ms | R1-R16
NR3| The E-plan system must have an easy user interface in terms of navigating with minimum number of clicks | R2-R10, R14, R15
NR4| The E-plan system must be able to scale for an increasing number of users  |  R1-R16
NR5| The E-Plan system must be able to handle multiple users interacting with the system without any issues | R1-R16

## Constraints
C#| Description
--|--
C1 | Limitation to single server can affect the number of hits 
C2 | Application is designed for small scale, so it is limited to less number of users, cannot handle millions of users at same time
C3 | An employee cannot view the details of team/project members if the employee himself is not associated with the team/project
C4 | An employee cannot add another employee to his/her team/project, only admin has the authority to add a new member to a team or a project
C5 | In case an employee forgets his/her password only an admin has the ability to create or reset a new password on behalf of the employee(for professional rightful purposes)
C6 | Limitation on the type of devices that are supported by E-Plan


# Brainstorming Results

### Application Domain Concepts
System, Admin, Employee, User, Team, Team Members, Project, Issues/Tasks, Attachment, Status, Issue Assignee, Issue Creator

- There are employees added in by admin
- Employees are grouped into teams
- Teams are created by admin
- Projects are created by admin
- Teams work on one or more projects
- Projects consist of team members working on issues/tasks
- An issue can be created by a team member
- An issue can also be assigned to a team member(s) (not necessarily the creator of the issue)
- An issue/task describes work to be done. It will have a status that tells us whether the issue is done/ongoing/reviewed/completed.
- Additionally, an issue can also have attachment or link to further explain or relevant to the task
- Once a task is completed, the issue can be marked as completed status
- An issue marked completed status can be deleted by the user who created the issue

### Summary
- Admin – is a user, can add more users, can create team, can create project
- Employee – is a user, can view their teams, can view their projects, can view their created issues, can view their assigned issues
- System – the controller and the thing the users interact with
- Team – Team consists of team members, and can be associated to projects
- Project – has a team associated with it, has issues
- Issue – created by a team member in a project, can be assigned, has a status, can have attachment/link

### Classification
#### Attributes
- User – username, password
- Employee – (methods)
- Admin – (methods)
- Team – Teamname, teammembers
- Project – ProjectName, description, completionPercent, deadline
- Issue – IssueNumber, name, description, attachments, tags, assignee, createdby

#### Actions
- Admin can create project
- Admin can create team
- Admin can add team member to team
- Admin can assign team to project
- Team Member (user) can create issue
- Team Member (user) can view issue
- Team Member (User) can view other Team Member(s) in their Team
- Team Member (User) can update issues

#### Relationships
- Admin is a user
- Employee is a user
- Team aggregates Employees
- Project aggregates Issues

# Domain Model

![Domain Model Class Diagram](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/main/wiki_images/iteration-1/domain-model/domain-model.svg)

# Use Cases
## Abstract Use Cases
ID#| Description
--|--
UC1 | Log into the system (Actor: User, System: E-plan) <br/>
UC2 | Create a new user (Actor: Admin, System: E-plan) <br/>
UC3 | Delete an existing user (Actor: Admin, System: E-plan) <br/>
UC4 | View all users (Actor: Employee, System: E-plan)<br/>
UC5 | Create a new team (Actor: Admin, System: E-plan) <br/>
UC6 | Delete an existing team (Actor: Admin, System: E-plan) <br/>
UC7 | View associated teams (Actor: Employee, System: E-plan)<br/>
UC8 | Create a new project (Actor: Admin, System: E-plan)<br/>
UC9 | Delete an existing project (Actor: Admin, System: E-plan)<br/>
UC10 | View associated projects (Actor: Employee, System: E-plan)<br/>
UC11 | Create a new issue in a project (Actor: Employee, System: E-plan)<br/>
UC12 | Delete an existing issue (Actor: Employee, System: E-plan)<br/>
UC13 | Change the status of an issue (Actor: Employee, System: E-plan)<br/>
UC14 | Log out of the system (Actor: User, System: E-plan)<br/>
UC15 | Bulk import users (Actor: Admin, System: E-plan) <br/>
## High-Level Use Cases
<br><b>UC1: Log into the system (Actor: User, System: E-plan)</b>
<br>`TUCBW`: A user sees the login page, fills out the username and password and clicks the "Log In" button.
<br>`TUCEW`: the user sees the home page.
<br><br><b>UC2: Create a new user (Actor: Admin, System: E-plan)</b>
<br>`TUCBW`: the admin clicks the “Add New” button on the homepage.
<br>`TUCEW`: the admin gets a new user-created confirmation message.
<br><br><b>UC3: Delete an existing user (Actor: Admin, System: E-plan)</b>
<br>`TUCBW`: The Admin clicks the “delete” button on the selected user.
<br>`TUCEW`: The admin gets a user deletion confirmation message.
<br><br><b>UC4: View all users (Actor: Admin, System: E-plan)</b>
<br>`TUCBW`: The Admin clicks the “view users” button on the home page.
<br>`TUCEW`: The admin gets all the user details on the user's page.
<br><br><b>UC5: Create a new team (Actor: Admin, System: E-plan)</b>
<br>`TUCBW`: The admin clicks the “Add New” button in the Teams list on the Teams section of the homepage.
<br>`TUCEW`: The admin sees a new team-created confirmation message.
<br><br><b>UC6: Delete an existing team (Actor: Admin, System: E-plan)</b> 
<br>`TUCBW`: The Admin clicks the “delete team” button on the selected team’s homepage.
<br>`TUCEW`: The admin gets a team deletion confirmation message.
<br><br><b>UC7: View associated teams (Actor: Employee, System: E-plan)</b> 
<br>`TUCBW`: The user loads the home page.
<br>`TUCEW`: The user gets all the associated team information.
<br><br><b>UC8: Create a new project (Actor: Admin, System: E-plan)</b>
<br>`TUCBW`: The admin clicks the “Add New” button in the Projects list on the Projects section of the homepage.
<br>`TUCEW`: The admin sees a confirmation message that a new Project has been created.
<br><br><b>UC9: Delete an existing project (Actor: Admin, System: E-plan)</b>
<br>`TUCBW`: The Admin clicks the “delete project” button on the selected project’s homepage.
<br>`TUCEW`: The admin gets a team deletion confirmation message.
<br><br><b>UC10: View associated projects (Actor: Employee, System: E-plan)</b>
<br>`TUCBW`: The user loads the home page.
<br>`TUCEW`: The user gets all the associated project information.
<br><br><b>UC11: Create a new issue in a project (Actor: Employee, System: E-plan)</b>
<br>`TUCBW`: The user clicks the “Create” button in the issues lists on the project page, describes the issue and clicks on the "Save" button.
<br>`TUCEW`: The admin sees a confirmation message that a new issue has been created.
<br><br><b>UC12: Delete an existing issue (Actor: Employee, System: E-plan)</b>
<br>`TUCBW`: The Admin clicks the “delete issue” button on the selected issue.
<br>`TUCEW`: The user gets an issue deletion confirmation message.
<br><br><b>UC13: Change the status of an issue (Actor: Employee, System: E-plan)</b>
<br>`TUCBW`: The user clicks the dropdown “Status” of the issue, selects the current status and clicks the “save” button.
<br>`TUCEW`: The employee sees the new status of the issue.
<br><br><b>UC14: Log out of the system (Actor: User, System: E-plan)</b>
<br>`TUCBW`: The Admin clicks the “logout” button on the homepage.
<br>`TUCEW`: The user gets a confirmation message saying the user session is closed.
<br><br><b>UC15. Bulk import users (Actor: Admin, System: E-plan)</b>
<br>`TUCBW`: The Admin clicks the “bulk import” button on the homepage.
<br>`TUCEW`: The user gets a confirmation message saying the users are saved.

## Top 5 Use Cases

* Create a new team
* Log into the system
* Create a new project
* Create a new issue in a project
* Change the status of an issue

## Expanded Use Cases 

<br><b>UC1. Log into the system</b> <br/>
`Precondition`: The user must have been registered with the E-Plan
Actor: The User| System: E-Plan
--|--
Nil | 0. The system displays the login page 
1.`TUCBW`: A user sees the login page, fills out the username and password and clicks the "Log In" button. | 2.The E-Plan validates the credentials and allows successful login of only authentic users and displays the homepage
3.`TUCEW`: the user sees the home page |
  
`Postcondition`: The user is logged into the system

<br><b>UC2. Create a new user</b> 

`Precondition`: Admin must log into the system and he/she must be part of the organisation.

Actor: The Admin| System: E-Plan
--|-- 
Nil| 0. The E-Plan system is available and displays the homepage 
1.`TUCBW`: the admin clicks the “Add New” button on the homepage | 2. E-Plan displays a popup with the option to enter the user name, email, skills and role
 3.The Admin enters the name, email, skills and role and clicks on the save button | 4.E-plan displays a confirmation message saying the team created 
5.`TUCEW`: the admin gets a new user-created confirmation message.

`Postcondition`: New team is created in the system

<br><b>UC3. Delete an existing user</b> <br/>
`Precondition`: The user must already be existing in the organization and can be deleted only by the admin
Actor: The Admin| System: E-Plan
--|--
Nil | 0. E-Plan system is available and displays list of users
1.`TUCBW`: The Admin clicks the “delete” button on the selected user| 2.E-Plan displays a pop up with Yes or No options,asking the admin for confirmation to delete the user 
3.The admin chooses the Yes option |  4.E-Plan deletes the user 
5.`TUCEW`: The admin gets a user deletion confirmation message 

`Postcondition`: The user is deleted 

<br><b>UC4. View all users</b> <br/>
`Precondition` : Admin must logged in the system and he/she must be part of the organisation
Actor: The Admin| System: E-Plan
--|--
Nil | 0. E-Plan system is available 
1.`TUCBW`: The Admin clicks the “view users” button on the home page| 2.E-Plan gets all the users in that organisation
3.`TUCEW`: The admin gets all the user details on the user's page

`Postcondition`: The admin verifies the users

<br><b>UC5. Create a new team</b>  <br/>
`Precondition`: Admin must logged in the system and he/she must be part of the organisation 

Actor: The Admin| System: E-Plan
--|-- 
Nil| 0. The E-Plan system is available and displays the homepage 
1.`TUCBW`: The admin clicks the “Add New” button in the Teams list on the Teams section of the homepage | 2. E-Plan displays a page with option to enter the team name along with the list of registered employees to choose from
3.The Admin enters the team name, selects the employees and clicks ‘create’ button | 4. E-plan displays a confirmation message saying team created  
5.`TUCEW`: The admin sees a new team-created confirmation message

`Postcondition`: New team is created in the system

<br><b>UC6. Delete an existing team</b> <br/>
`Precondition`: The team must already be existing in the organization and can be deleted only by the admin
Actor: The Admin| System: E-Plan
--|--
Nil | 0. E-Plan system is available and displays homepage of the selected team
1.`TUCBW`: The Admin clicks the “delete team” button on the selected team’s homepage| 2.E-Plan displays a pop up with Yes or No options,asking the user for confirmation to delete the team 
3.The admin chooses the Yes option |  4. E-Plan deletes the team |
5.`TUCEW`: The admin gets a team deletion confirmation message 

Postcondition: The team is deleted

<br><b>UC7. View associated teams</b> <br/>
`Precondition`: User must log into the system and he/she must be part of the organisation.
Actor: The Admin| System: E-Plan
--|--
Nil | 0. E-Plan system is available 
1.`TUCBW`: The user loads the home page | 2.E-Plan gets all the teams associated with that user
3.`TUCEW`: The user gets all the associated teams information

`Postcondition`: The user verifies the teams

<br><b>UC8. Create a new project</b>  <br/>
`Precondition`: Admin must log in the system and he/she must be part of the organisation
Actor: The Admin| System: E-Plan
--|--
Nil | 0. The E-Plan system is available and displays the homepage
1.`TUCBW`: The admin clicks the “Add New” button in the Projects list on the Projects section of the homepage | 2. E-Plan displays a page with option to enter the Project name, description along with the list of registered employees to choose from
3.The admin enters the Project name, description and selects the employees and clicks the submit button | 4. E-Plan displays a confirmation message saying Project created
5.`TUCEW`: The admin sees a confirmation message that a new Project has been created |  

`Postcondition`: New project is created in the system

<br><b>UC9. Delete an existing project</b> <br/>
`Precondition` : The project must already be existing and can be deleted only by the admin
Actor: The Admin| System: E-Plan
--|--
Nil | 0. E-Plan system is available and displays homepage of the selected project
1.`TUCBW`: The Admin clicks the “delete project” button on the selected project’s homepage| 2.E-Plan displays a pop up with Yes or No options,asking the user for confirmation to delete the project 
3.The admin chooses the Yes option |  4. E-Plan deletes the project |
5.`TUCEW`: The admin gets a team deletion confirmation message 

`Postcondition`: The project is deleted

<br><b>UC10. View associated projects</b> <br/>
`Precondition`: The user must log into the system and he/she must be part of the organisation
Actor: The Admin| System: E-Plan
--|--
Nil | 0. E-Plan system is available 
1.`TUCBW`: The user loads the home page | 2.E-Plan gets all the projects associated with that user
3.`TUCEW`: The user gets all the associated projects information

`Postcondition`: The user verifies all the projects

<br><b>UC11. Create a new issue</b> <br/>
`Precondition`: User must log in to the system and he/she must be part of the project
Actor: The Admin| System: E-Plan
--|--
Nil | 0. The E-Plan system is available and displays the project page
1.`TUCBW`: The user clicks the “Create” button in the issues lists on the project page, describes the issue and clicks on the "Save" button. | 2.E-Plan saves the issue and sends the confirmation message saying the issue created.
3.`TUCEW`: The admin sees a confirmation message that a new issue has been created

`Postcondition`: New project is created in the system

<br><b>UC12. Delete an existing issue</b> <br/>
<br> `Precondition` : the issue must already be existing in the project and can be deleted only by the user who belongs to that project 
Actor: The Admin| System: E-Plan
--|--
Nil | 0. E-Plan system is available and displays the list the issues of the selected project
1.`TUCBW`: The Admin clicks the “delete issue” button on the selected issue | 2.E-Plan displays a pop-up with Yes or No options,asking the user for confirmation to delete the issue 
3.The admin chooses the Yes option |  4. E-Plan deletes the issue |
5.`TUCEW`: The user gets an issue deletion confirmation message 

`Postcondition`: the issue is deleted

<br><b>UC13. Change the status of an issue</b> <br/>
`Precondition`: The user must be logged into the system and must have permission to access this issue
Actor: The Admin| System: E-Plan
--|--
Nil | 0. E-Plan displays the issue page 
1.`TUCBW`: The user clicks the dropdown “Status” of the issue, selects the current status and clicks “save” button | 2. E-Plan displays the new status in the issue page 
3.`TUCEW`: The employee sees the new status of the issue

Postcondition: The issue has the updated status

<br><b>UC14. Log out of the system</b> <br/>
<br> `Precondition`: the user must already be logged into the system and session context is created 
Actor: The Admin| System: E-Plan
--|--
Nil | 0. E-Plan system is available and displays the logout button on the homepage
1.`TUCBW`: The Admin clicks the “logout” button on the homepage | 2. E-Plan clears all the user session details and sends the logout confirmation
3.`TUCEW`: The user gets a confirmation message saying the user session is closed.

`Postcondition`: The user logs out.

<br><b>UC15. Bulk import users</b> <br/>
<br> `Precondition`: the Admin must already be logged into the system
Actor: The Admin| System: E-Plan
--|--
Nil | 0. E-Plan system is available and displays the logout button on the homepage
1.`TUCBW`: The Admin clicks the “bulk import” button on the homepage | 2.E-Plan opens a form to upload a file to import
3.The admins upload the file and clicks on the save button | 4.E-plan saves the users and sends the confirmation message
5.`TUCEW`: The user gets a confirmation message saying the users are saved.

`Postcondition`: the users are imported into the system.
## Use Case Diagram
<p slign = "center">
<img src = "https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/c987894d9196cbe4a6f2b8862ea31b9ffeda5b03/wiki_images/UCdiaEplan.svg" />
</p>

## Traceability Matrix between Requirements and Use cases

Requirement Id |Requirement Priority | Use case Id1 | Use case Id2 | Use case Id3 | Use case Id4 | Use case Id5 | Use case Id6 | Use case Id7 | Use case Id8 | Use case Id9 | Use case Id10 | Use case Id11 | Use case Id12 | Use case Id13 | Use case Id14 | Use case Id15 | Use case Id16 | Use case Id17 | Use case Id18 | Use case Id19 | Use case Id20
--- | --- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |---
R1 | 16 | X |  | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - 
R2 | 15 | - | X | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - 
R3 | 14 | - | - | X | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - 
R4 | 13 | - | - | - | X | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - 
R5 | 12 | - | - | - | - | X | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - 
R6 | 11 | - | - | - | - | - | X | - | - | - | - | - | - | - | - | - | - | - | - | - | - 
R7 | 10 | - | - | - | - | - | - | X | - | - | - | - | - | - | - | - | - | - | - | - | - 
R8 | 9 | - | - | - | - | - | - | - | X | - | - | - | - | - | - | - | - | - | - | - | - 
R9 | 8 | - | - | - | - | - | - | - | - | X | - | - | - | - | - | - | - | - | - | - | - 
R10 | 7 | - | - | - | - | - | - | - | - | - | X | - | - | - | - | - | - | - | - | - | - 
R11 | 6 | - | - | - | - | - | - | - | - | - | - | X | - | - | - | - | - | - | - | - | - 
R12 | 5 | - | - | - | - | - | - | - | - | - | - | - | X | - | - | - | - | - | - | - | - 
R13| 4 | - | - | - | - | - | - | - | - | - | - | - | - | X | - | - | - | - | - | - | - 
R14 | 3 | - | - | - | - | - | - | - | - | - | - | - | - | - | X | X | X | X | X | - | - 
R15 | 2 | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | X | - 
R16 | 1 | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | X
Nil | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - 
Nil | Use case score | 16 | 15 | 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 3 | 3 | 3 | 3 | 2 | 1 

## Non-Trivial Steps


NTS#|Description
--|--
1| `Log in to the system` <br/> 1.1 The E-Plan AuthController will receive the username and password for validation. <br/> 1.2 The Auth Controller will send this info to the user service for validation. <br/> 1.3 The User service will call the User Repository to get the User object for validation. <br/> 1.4 Now the User service will compare the username and password against the user object and generates the Auth token. <br/> 1.5 The Auth token will be returned to the Auth Controller and UI.
2| `Change the status of an issue` <br/> 2.1 The E-plan Project Controller will receive a request to update the status of the issue. <br/> 2.2 Project Controller will Authorize the requested user before requesting the Project service by passing the user auth token. <br/> 2.3 If the user is authorized then the Project controller will call the Project service to update the issue status. <br/> 2.4 The project service calls the Issue Repository to get the issue by Id and then updates the issue. <br/> 2.5 The updated issue will be returned to the Project Controller and cascaded to UI.
3| `Create a new project` <br/> 3.1 The E-plan Project Controller will receive a request to create a new project. <br/> 3.2 Project Controller will Authorize the requested user before requesting the Project service by passing the user auth token. <br/> 3.3 If the user is authorized then the Project controller will call the Project service to create a project. <br/> 3.4 The project service creates a new project object and calls the Project Repository to save the new project object. <br/> 3.5 The newly created project will be returned to the Project Controller and cascaded to UI.
4| `Create a new issue in a project` <br/> 4.1 The E-plan Project Controller will receive a request to add a new issue to a project. <br/> 4.2 Project Controller will Authorize the requested user before requesting the Project service by passing the user auth token. <br/> 4.3 If the user is authorized then the Project controller will call the Project service to create a new issue in that project. <br/> 4.4 The project service calls the Project Repository to get the project by Id and then adds the new issue to that project. <br/> 4.5 The newly created project list will be returned to the Project Controller and cascaded to UI.
5| `Delete an existing team` <br/> 5.1 The E-plan Team Controller will receive a request to delete an existing team based on the input team id.<br/> 5.2 team Controller will Authorize the requested user before requesting the team service by passing the user auth token. <br/> 5.3 If the user is authorized then the team controller will call the team service to delete a team with the corresponding team id. <br/> 5.4 The team service deletes the team by calling the team Repository to delete the team object with the corresponding team id.
6| `Delete an existing project` <br/> 6.1 The E-plan Project Controller will receive a request to delete an existing project based on the input project id.<br/> 6.2 Project Controller will Authorize the requested user before requesting the Project service by passing the user auth token.<br/> 6.3 If the user is authorized then the Project controller will call the Project service to delete a project with the corresponding project id.<br/> 6.4 The project service deletes the project by calling the Project Repository to delete the project object with the corresponding project id.
7| `Create a new user` <br/> 7.1 The E-plan User Controller will receive a request to create a new user. <br/> 7.2 User Controller will Authorize the requested user before requesting the Project service by passing the user auth token. <br/> 7.3 If the user is authorized then the User controller will call the User service to create a user. <br/> 7.4 The user service creates a new user object and calls the User Repository to save the new user object. <br/> 7.5 The newly created user will be returned to the User Controller and cascaded to UI.
8| `Delete an existing user` <br/> 8.1 The E-plan User Controller will receive a request to delete an existing user based on the input user id.<br/> 8.2 User Controller will Authorize the requested user before requesting the user service by passing the user auth token. <br/> 8.3 If the user is authorized then the user controller will call the user service to delete a user with the corresponding user id. <br/> 8.4 The user service deletes the team by calling the user Repository to delete the user object with the corresponding user id.
9| `Create a new team` <br/> 9.1 The E-plan Team Controller will receive a request to create a new project. <br/> 9.2 Team Controller will Authorize the requested user before requesting the user service by passing the user auth token. <br/> 9.3 If the user is authorized then the team controller will call the team service to create a team. <br/> 9.4 The team service creates a new team object and calls the team repository to save the new team object. <br/> 9.5 The newly created team will be returned to the team controller and cascaded to UI.
10| `Delete an existing issue` <br/> 10.1 The E-plan Issue Controller will receive a request to delete an existing Issue based on the input Issue id.<br/> 10.2 Issue Controller will Authorize the requested user before requesting the user service by passing the user auth token.<br/> 10.3 If the user is authorized then the Issue controller will call the Issue service to delete an Issue with the corresponding Issue id.<br/> 10.4 The Issue service deletes the Issue by calling the Issue Repository to delete the Issue object with the corresponding Issue id.
11| `Log out of the system` <br/> 11.1 thee E-plan AuthController will receive the username and jwt to close the session and clear the context. <br/> 11.2 The Auth Controller will close the user session. <br/> 11.3 The Auth Controller will return the HTTTP code to the UI.
12| `View all users` <br/> 12.1 The user controller will receive a request that contains orgId to get all the users.<br/> 12.2 User Controller will Authorize the requested user before requesting the user service by passing the user auth token. <br/> 12.3 If the user is authorized then the user controller will call the user service to get all users <br/> 12.4 The user service will get all the users from the DB. <br/> 12.5 The user's list will be returned to the user controller and filtered against orgId and returned to the UI.
13| `View associated projects` <br/> 13.1 The projects controller will receive a request that contains orgId to get all the projects.<br/> 13.2 project Controller will Authorize the requested user before requesting the user service by passing the user auth token. <br/> 13.3 If the user is authorized then the project controller will call the project service to get all users <br/> 13.4 The project service will get all the projects from the DB. <br/> 13.5 The projects list will be returned to the project controller and filtered against orgId and returned to the UI.
14| `View associated teams` <br/> 14.1 The team's controller will receive a request that contains orgId to get all the teams.<br/> 14.2 team Controller will Authorize the requested user before requesting the user service by passing the user auth token. <br/> 14.3 If the user is authorized then the team controller will call the team service to get all teams <br/> 14.4 The team service will get all the teams from the DB. <br/> 14.5 The team's list will be returned to the team's controller and filtered against orgId and returned to the UI.
15| `Bulk import users` <br/> 15.1 The user's controller will receive a request to import the bulk users.<br/> 15.2 User Controller will Authorize the requested user before requesting the user service by passing the user auth token. <br/> 15.3 If the user is authorized then the team controller will call the team service to import the users <br/> 15.4 The user service now calls the ImportServiceFactory class to get the import service object based on the file extension. <br/> 15.5 ImportService then reads a file and outputs the list of users to use service class <br/> 15.6 User service then saves all the users to the DB and returns to the user controller and to UI.
# Sequence Diagrams
`1. Log in to the system`

![login-sequence](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/baf21f402f05cbcf8c8581a45efe8d0f91768f02/wiki_images/loginSequence.svg)

`2. Change the status of an issue`

![update-issue](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/9be73309062b1f8585e764b5134bebbf80b84a1d/wiki_images/updateIssue.svg)

`3. Create a new project`

![create-project](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/ac9d39780fa616edafccc91348130e668560f58b/wiki_images/createProject.svg)

`4. Create a new Issue`

![create-issue](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/e937470a77ff6313185498f1c44516697960f78d/wiki_images/createIssue.svg)

`5. Delete an existing team`

![deleteTeam](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/653ddc798f237b50e8cef8d28163ffb0e27c04bc/wiki_images/deleteTeam.svg)

`6. Delete an existing project`

![delete-project](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/112611ee4cafb01c1802e061a68ab2ffabf3b3b1/wiki_images/updatedDeleteProject.svg)

`7. Create a new user`
![Createuser](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/822035b89c23d713157486e4e7ffe7fff3160d41/wiki_images/createUser.svg)

`8. Delete an existing user`

![Deleteexistinguser](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/493c0d8057de485c90012365053be37988885c05/wiki_images/deleteUser.svg)

`9. Create a new team`
![CreateNewTeam](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/637f9ec02681f477274fafb1653c74fac263bff2/wiki_images/saveTeam.svg)

`10. Delete an existing issue`

![deleteIssue](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/71490d735fa4865d33e28b54790b707326f70c6f/wiki_images/deleteIssue.svg)

`11. Log out of the system`

![logout](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/fa1d3e20d5cb22f5b47da022310371016861c32f/wiki_images/logout.svg)

`12. View All Users`

![viewAllUsers](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/60b3002f86f5ecd9110c97a0dbdb424dee239695/wiki_images/viewAllUsers.svg
)

`13. View associated projects`
![ViewAssociatedProjects](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/d1cef01b14d3d76af257401b7cada1a7f31aa2f5/wiki_images/allprojects.svg)

`14. View associated teams`
![ViewAssociatedProjects](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/d1cef01b14d3d76af257401b7cada1a7f31aa2f5/wiki_images/allteams.svg)

`15. Buld Import users`
![bulkimportusers](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/76962313b7332bc11616fde18deaa486a0be6eb6/wiki_images/bulkimport.svg)

# Design Class Diagram

![design-class-diagram](https://github.com/UTDClassroomOrg/courseproject-cs6359-f22-group5/blob/6cb04260fc86fbcd31fb2f396f2025342c3590d7/wiki_images/Class%20Diagram%20.svg)

# Identifying GRASP PATTERNS
<br><b> 1</b>. `project controller and user controller,IssueController,AuthController,teamController and other controllers` - They represent the controller pattern. The project controller and user controller just receive commands from the user and delegate the work corresponding to those commands to the respective classes that are responsible. For example the user controller receives requests and delegates all of the work to user services class. 
<br><b> 2</b>. `project repository, issue repository, team repository(other repositories)` - represent the creator pattern. These repositories are responsible for creating their respective objects. For example the project repository is responsible for creating project objects. 
<br><b> 3</b>. `user class` - represents the expert pattern. For example during the time of validation of login credentials of a user, to check if the entered login credentials are valid we approach the user class who is an expert and holds its own username and password within itself.
<br><b> 4</b>. `project services class and the user services class` - represent high cohesion. For example project services class is not associated with any activities or tasks performed by the user services class. The vice versa also holds true. These classes are assigned with their respective responsibilities and are not burdened with unrelated or unnecessary responsibilities. They are designed to work on their own set of unique tasks and follow separation of concerns principle.
<br><b> 5 </b>. `project controller,user controller,IssueController,AuthController,teamController and other controllers`- They represent low coupling.The low coupling pattern dictates how to assign responsibilities to achieve low dependency between classes,lower impact on other classes if a change is made in any one of the class and for reusability purposes. The controllers are engaged only with controlling the flow of activity.The controllers are decoupled from the program . their job  is to only delegate work.they are not concerned with the underlying working process or code of the program.Instructions will go through the controller and there will be no strong connection or dependency between the client and the corresponding classes that fulfill the client’s request behind the controller. The fewer connections the more stable the system will be. It will be easy for us to refactor and also to maintain cleaner code.
<br><b> 6 </b>. `ImportServiceFactory` - As polymorphism pattern deals with how general responsibility gets distributed among set of classes or interfaces and how result is based on the type of characteristic that we choose.We can observe this pattern in ImportServiceFactory. Here depending on the type of import that the user chooses , the respective class either XLXS or Txt will be called and according to the code in those classes users will be imported. We can see that depending on the user’s choice of input the ImportServiceFactory behaves differently. If the user’s choice is excel sheet then it will behave according to code in  XLXS class to read an excel file  and on the other hand if the user’s choice is Txt then it will behave differently to read a txt file and generate output. This scenario exhibits polymorphism. 
<br><b> 7 </b>. `Base controller` - this class exhibits Pure fabrication because it is an artificial class that is not a part of the problem domain but it is made up to support high cohesion , low coupling through logger service responsibilities that have been assigned to this class.

# Design Patterns 

## Decorator pattern 
It is a structural design pattern. It allows us to add new behaviors to objects by placing these objects inside wrapper objects. These wrapper objects contain additional behaviors that are used to decorate the original object. We have taken into consideration a scenario wherein we want to keep our user credentials secured. To achieve this we have considered decorating the password of the user while saving it in the database. To implement this we have used a decorator pattern. The organization which uses our ePlan system can make a choice on how they want to keep their user’s password secured. They can keep it secured either by applying <br/>
(i)hashing algorithm on the original password and storing it in database <br/>
Or
(ii) encryption algorithm on the original password and storing it in the database <br/>
Or 
(iii) both encryption and hashing algorithms in desired order and storing in the database <br/>
Or 
(iv) simply store the original password in the database without encrypting or hashing it <br/>
In this way we are applying additional behaviors or decorations on the original password and implementing decorator pattern through classes that implement a common interface and all in turn work towards applying additional decorators on the original password to achieve enhanced security 

## Builder Pattern 
It is a creational design pattern. It will allow us to construct complex objects step by step 
It will help us to produce various types and representations of objects using same construction code. We wanted to create different users who can use our ePlan system. To achieve this we have used @Builder annotation of project Lombok in spring boot. The beauty of this framework allowed us to user builder pattern automatically.We have annotated our user class with @Builder. This allowed us to create copies or near-copies of user objects wherever we wanted to create user objects. It helped us in creating different instance of the same object with the desired attributes of original class.We built the user object in the instances that we wanted to using the .build() method of the builder.


## Singleton Pattern 
It is a creational pattern that makes sure that a class has only a single instance.We provide a global access point to this instance. Logging actions into the log after completion of every task required us to to access the logging service multiple times.Keeping a global variable was risky as it may be overridden. But we wanted to access the logger object from anywhere in the program. So we implemented the singleton pattern here through an interface called IloggerService which contains one method , provided to record actions into the log. Whenever and wherever we want to record actions into log we simply used the method inside the ILoggerService to log our actions. In this way we ensured single instance of the logger object and implemented singleton pattern .

## Factory Pattern 
It is one of the creational design patterns. It allows us to create objects in a superclass through an interface but at the same time gives the flexibility for the subclasses to alter the type of objects that will be created. We wanted to enable a bulk import feature in our ePlan system when we can add multiple users at the same time.while adding multiple users we wanted to provide a choice of method of adding. We can either add them by reading through a text file or by reading through an excel file. To achieve this we used the factory pattern. We have implemented factory pattern through an interface called the IImportService and XLXSimportService and TxtImport service as two classes that implement this common interface.
Based on  the type of import the user chooses, the ImportServiceFactory class acts as a factory class and  the factory pattern comes into picture by creating the objects of the corresponding format class (xlxs or txt). In this way we have given the choice for the subclasses to create respective objects based on the type of file format the user chooses to import new users and we have implemented the factory pattern 

## Adapter Pattern
This structural design pattern helps incompatible interfaces to collaborate. We are implementing this using the ExcelHelper class which is helping in collaborating the incompatible types. It is converting the user information inside excel file into user objects 

# Test Coverage 

We have done unit testing using Mockito 

## Test coverage for Users
![image](https://user-images.githubusercontent.com/112896525/205418153-9cc513b1-d786-4492-aa58-2a610a7209f2.png)
![image](https://user-images.githubusercontent.com/112896525/205418271-4ce5d71a-6134-4a97-934b-3b244e6a0690.png)
![image](https://user-images.githubusercontent.com/112896525/205418316-8e87871c-d233-4491-9786-6b8b14bb3ff3.png)
![image](https://user-images.githubusercontent.com/112896525/205418344-390d4783-3e13-4d7f-90b9-ec2e8000ca3d.png)

## Test coverage for Teams
![image](https://user-images.githubusercontent.com/112896525/205424963-adeea9bd-39ca-49ff-b6ff-bf5e8f4542f8.png)
![image](https://user-images.githubusercontent.com/112896525/205425037-38f8b928-4c0a-4ad8-989a-6971636eea40.png)
![image](https://user-images.githubusercontent.com/112896525/205425046-7dcd1881-1a48-4ea8-88e1-5b5a78aeb18d.png)

## Test coverage for Projects 
![image](https://user-images.githubusercontent.com/112896525/205425171-7b57180d-9d86-45b9-bb14-502341f98c53.png)
![image](https://user-images.githubusercontent.com/112896525/205425198-1a0e495a-fd47-42fb-b8f9-d9eac094a004.png)
![image](https://user-images.githubusercontent.com/112896525/205425204-efb47273-8cab-4258-bf9c-9e94da457ef7.png)



## Sources 
https://www.baeldung.com/ <br/>
https://refactoring.guru/ <br/>
https://en.wikipedia.org/ <br/>



