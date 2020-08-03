module.exports = {
  html:function (title, list, body, control) {
    return `
    <!doctype html>
    <html>
    <head>
    <title>WEB_2 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
      <h1 style="text-align:left; font-size:30px " ><a href="/">연식인사이드</a></h1>
      <hr class="two">
      <div style="float: left; width: 20%; padding:10px;">
        ${list}
        ${control}
      </div>
      <div style="float: left; width: 70%; padding:10px; border-left:thin solid #808080;">
        ${body}
      </div>
      <div style ="position:absolute;">
      <a href="/author">author</a>
      </div>
    </body>
    </html>   
    `;
  },
  list:function (topics) {
    var list = '<ul>';
    var i = 0;
    for(i = 0; i < topics.length; i  = i + 1) {
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
    }
    list = list + '</ul>';
    return list;
  },
  authorselect:function(authors) {
    var tag = '';
    for(var i = 0; i < authors.length; i++) {
      tag += `<option value = "${authors[i].id}">${authors[i].name}</option>`
    }
    return `
    <select name="author">
    ${tag}
    </select>`; 
  },
  authortable:function(authors) {
    var tag = '<table>';
      for(var i = 0; i < authors.length; i++) {
          tag += `
              <tr>
                  <td>${authors[i].name}</td>
                  <td>${authors[i].profile}</td>
                  <td><a href="/author/update?id=${authors[i].id}">update</a></td>
                  <td>
                    <form action="/author/delete_process" method="post">
                    <input type="hidden" name="id" value="${authors[i].id}">
                    <input type="submit" value="delete">
                    </form>
                  </td>
              </tr>
          `
      }
      tag += '</table>'
      return tag;
  }
}