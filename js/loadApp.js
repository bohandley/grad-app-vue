// on load of the page, 
// get all users, appsettings and admintexts
// and load these into app's data(the vm object's data)`
var usrs = fetch('http://52.86.114.29:8513/php/usrs.php').then(res=>res.json());
var appsettings = fetch('http://52.86.114.29:8513/php/appsettings.php').then(res=>res.json());
var admintexts = fetch('http://52.86.114.29:8513/php/admintexts.php').then(res=>res.json());;

var promises = [usrs, appsettings, admintexts];
Promise.all(promises)
  	.then((data) => {
		app.usrs = data[0];
		app.appsettings = data[1];
		app.admintexts = data[2];
  	});
