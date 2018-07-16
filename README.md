Relative to branch Material:<br />
<br />
Modify index.js adding basename for make it works on PLC, remove basename for make it works in local<br />
Use data in build folder for make it works on PLC, Use data in public folder for make it works in local<br />
<br />
npm install<br />
npm start<br />
<br />
for local execution.<br />
If you want to try PLC version you can take the Build folder, it should be already ok.<br />
WEB.zap14 contains the PLC Software.<br />
<br />
Load WEB.zap14 in a CPU<br />
Modify data in build/data for customize the functions<br />
Recreate the web blocs and reload the CPU<br />
You can view the project browsing the IP of the CPU in the Browser
