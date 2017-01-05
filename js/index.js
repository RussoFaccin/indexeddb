let movie_list = document.getElementById("movie_list");
let is_idb = false;
let indexedDB = null;
let movie_item = "";
let cur_count = 0;

if("indexedDB" in window){
  indexedDB = window.indexedDB;
  is_idb = true;
}

if(is_idb){
  let request = indexedDB.open("movie_list",1);
  request.onupgradeneeded = function(e){
    var db = e.target.result;
    if(!db.objectStoreNames.contains("movies")){
      var store = db.createObjectStore("movies", {keyPath: "id", autoIncrement:true});
      store.createIndex("movie_title", "movie_title", {unique:false});
    }
  };

  request.onsuccess = function(e){
    var db = e.target.result;
    var objectStore = db.transaction("movies").objectStore("movies");
    var open_cursor = objectStore.openCursor();
    open_cursor.onsuccess = function(e){
      var cursor = e.target.result;
      cur_count += 1;
      console.log("Cursor Iteration: "+cur_count);
      if(cursor){
        movie_item += '<li data-id="'+cursor.value.id+'"><h1>'+cursor.value.movie_title+'</h1><a href="'+cursor.value.movie_trailer+'" target="_blank"><img src="'+cursor.value.movie_poster+'" /></a></li>';
        cursor.continue();
      }
      movie_list.innerHTML = movie_item;
    };
  };
}
