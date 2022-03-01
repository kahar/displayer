var txt = `Przepaść
Jaskinia
Grota
Pieczara
Otchłań`

var output = "";
var splittedArray = txt.split(/\r?\n/);
var incrementNumber = Math.floor(100 / splittedArray.length);
for (var i = 0; i < splittedArray.length; i++) {
    var toIndex = i * incrementNumber + incrementNumber;
    console.log("debug i=" + i + "  incrementNumber: " + incrementNumber + " toIndex " + toIndex)
    output = output + '\n' + '{ "Chance": ' + toIndex + ', "Description": "' + splittedArray[i] + '" },'
}
console.log(output);


function transformTable(table) {
    for (var i = 0; i < table.length; i++) {
        var element = table[i];

        console.log('{ "Chance":' + element.range.max + ', "Description": "' + table[i].content + '" },')
    }
}