<h1>MySQL Workbench Guide</h1>

<hr>

<h2>Steps:</h2>
1. Install Workbench <br/>
2. Connect to MySQL database <br/>
3. Load CSV data and save (per table)<br/>

<hr>

<h2>1. Install Workbench</h2>
- Download and install: http://dev.mysql.com/downloads/workbench/<br/>

<h2>2. Connect to MySQL database</h2>
- Open MySQL <br/>
- At top. Click on plus. <img src="images/connections.png" alt="MySQL Connections (+)"style="width:304px;height:228px;"> <br/>
<code>
	Stored Connection: [name of connection]
	Connection Method: Standard (TCP/IP)
	Parameters
	Hostname: 127.0.0.1 Port: 3306
	Username: root
</code>
<br/>
-OK <br/>
-Double click on new connection (with [name of connection]) <br/>
-Enter password for db <br/>


<h2>3. Load CSV data and save (per table)</h2>
- Left side -> Under Schemas -> click on [db name]: <br/>
<h3>NOTE: (DO FOR EACH TABLE)</h3>
<h4>NOTE: Order for filling tables:</h4>
1.Professor<br/>
2.Course<br/>
3.Section<br/>
4.Quiz<br/>
5.Question<br/>
6.Student<br/>
7.Answer<br/>
8.studentAnswer<br/>
9.section_students__student_sections<br/>

<h4>STEPS:</h4)
- Click on table with lightning highlighted in below image. On left side under SCHEMAS -> [namedb] -> Tables -> [tablename1] <br/>
<img src="images/workbenchtable.png" alt="Workbench"style="width:304px;height:228px;"> <br/>

<img src="images/workbenchzoom.png" alt="Workbench Zoom"style="width:304px;height:228px;"> <br/>
- In Result Grid bar. Click on import: <br/>
<img src="images/import.png" alt="import"style="width:304px;height:228px;"> <br/>
- Navigate to .csv with name of table in Quizzly/db/ and select. Result Grid should be populated. <br/>
- In Result Grid. Select first object in Result Grid (if its not correct data [heading data]).  Then in Result Grid bar, select red minus table sign (to delete):<br/>
<img src="images/delete.png" alt="import"style="width:304px;height:228px;"> <br/>
- Hit apply at bottom right.<br/>
<img src="images/apply.png" alt="import"style="width:304px;height:228px;"> <br/>
- Hit apply in next window. Result should say: Execute SQL Statements. SQL script was successfully applied to the database.<br/>
-Close. Table on MySQL is now filled with csv data! <br/>
-Go to next table and repeat from NOTE!