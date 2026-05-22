const fs = require('fs');
let js = fs.readFileSync('public/js/modules_absensi.js', 'utf8');

js = js.replace(/<td class="t2" style="font-weight:600;color:var\(--v\)"><div style="display:flex;align-items:center"><span class="bdg bb" style="font-size:10px;padding:2px 6px;margin-right:5px"><img src="image\/add-document\.png" style="width:1\.2em;height:1\.2em;vertical-align:middle"> MAPEL<\/span> \$\{r\.subject\|\|'—'\}<\/div><\/td>\s*<td>\$\{ftm\(r\.time\)\}<\/td>\s*<td class="t2 txs">\$\{r\.teacher_name\|\|'Sistem \(AI\)'\}<\/td>\s*<td>\$\{mkBadge\(r\.status\)\}<\/td>/g, 
  '<td data-label="Mapel" class="t2" style="font-weight:600;color:var(--v)"><div style="display:flex;align-items:center"><span class="bdg bb" style="font-size:10px;padding:2px 6px;margin-right:5px"><img src="image/add-document.png" style="width:1.2em;height:1.2em;vertical-align:middle"> MAPEL</span> ${r.subject||\\'—\\'}</div></td>\\n      <td data-label="Waktu">${ftm(r.time)}</td>\\n      <td data-label="Guru" class="t2 txs">${r.teacher_name||\\'Sistem (AI)\\'}</td>\\n      <td data-label="Status">${mkBadge(r.status)}</td>');

fs.writeFileSync('public/js/modules_absensi.js', js);
console.log('Done!');
