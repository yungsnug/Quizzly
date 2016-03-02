<h1>Github Guide/Commands</h1>

<hr>

<h2>Steps:</h2>
1. See git is installed <br/>
2. clone repo <br/>
3. see what branch you are on<br/>
4. see status of branch you are on<br/>
5. update repo/pull from master <br/>
6. create branch<br/>
7. add/commit/push to branch<br/>
8. add/commit/push to master<br/>
9. reset commit locally<br/>
10. fix merge conflict<br/>
11. check differences between branches<br/>
12. Stuck after push? You are probably in vim or vi. Just <code>:q [enter]</code><br/>


<hr>

<h2>1. See git is installed <br/></h2>
- Type <code>git</code> into terminal.  If not found, install from online.<br/>

<h2>2. Clone repo</h2>
- <code>git clone https://github.com/freyconner24/Quizzly.git</code>

<h2>3. see what branch you are on</h2>
- <code>git branch</code>

<h2>4. see status of branch you are on </h2>
- <code>git status</code>

<h2>5. update repo/pull from master </h2>
- <code>git pull origin master</code>

<h2>6. create branch </h2>
- <code>git checkout -b [branch name]</code>

<h2>7. add/commit/push to branch</h2>
A. Add:<br/>
- <code>git add [files or directories]</code><br/>
- Add all files changed in Quizzly/ run: <code>git add .</code><br/>
B. Commit: <br/>
- <code>git commit -m "[message describing what happened]"</code><br/>
C. Push: <br/>
- <code>git push origin [branch name]</code><br/>

<h2>8. push to master </h2>
A. Do step 7 (above: add/commit/push to branch)<br/>
B. Push: <br/>
- <code>git push origin [branch name]:master</code><br/>

<h2>9. reset commit locally on branch</h2>
- <code>git reset --hard HEAD</code>

<h2>10. fix merge conflict</h2>
- See: https://help.github.com/articles/resolving-a-merge-conflict-from-the-command-line/ 

<h2>11. check differences between branches</h2>
- <code>git diff branch_1..branch_2</code>

<h2>12. Stuck after push? You are probably in vim or vi. Just <code>:q [enter]</code></h2>
- <code>:q [enter]</code>


