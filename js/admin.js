let form = document.querySelector("form");
let is_idb = false;
let indexedDB = null;
let movie_item = "";

if ("indexedDB" in window) {
	indexedDB = window.indexedDB;
	is_idb = true;
}

let form_submit = document.getElementById("form_submit");

form_submit.onclick = function(evt) {
	console.log("FORM SUBMITED");
	evt.preventDefault();
	let movie_title = document.getElementById('form_title').value;
	let movie_poster = document.getElementById('form_poster').value;
	let movie_trailer = document.getElementById('form_trailer').value;
  let movie = {movie_title:movie_title, movie_poster:movie_poster, movie_trailer:movie_trailer};
  form.reset();
	if (is_idb) {
		let request = indexedDB.open("movie_list", 1);

		request.onsuccess = function(e) {
			var db = e.target.result;
			var transaction = db.transaction(["movies"], "readwrite");
			var store = transaction.objectStore("movies");
			store.add(movie);
      console.log("MOVIE ADDEDD!!!");
		};
	}
};
