//Book Constructor
function Book(title, author, isbn) {
    this.title=title;
    this.author=author;
    this.isbn=isbn;
} 

//UI Constructor
function UI(){}

UI.prototype.addBookToList=function (book){
    const list=document.getElementById('book-list');
    //create tr element
    const row=document.createElement('tr');
    // insert tds(cols) in tr
    row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert=function(msg, className){
    //create div
    const div=document.createElement('div');
    //Add classes
    div.className=`alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(msg));
    //Get parent
    const container=document.querySelector('.container');
    //Get form
    const form=document.querySelector('#book-form');
    //Insert Alert
    container.insertBefore(div, form);

    //dissappear after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}

//Clear Fields
UI.prototype.clearFields=function() {
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}


//event listeners
document.getElementById('book-form').addEventListener('submit', function(e){
    //get form values
    const title=document.getElementById('title').value,
          author=document.getElementById('author').value,
          isbn=document.getElementById('isbn').value;

    //instantiate book      
    const book = new Book(title, author, isbn);

    //instantiate UI
    const ui = new UI();

    //validate UI
    if(title === ''||author===''||isbn===''){
        //error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {

    }

    //Add book to list
    ui.addBookToList(book);

    //clear fields
    ui.clearFields();

    e.preventDefault();
})
